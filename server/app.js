const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
    res.json({message: "Server is running"});
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.post("/api/reports", (req, res) => {
    const { title, description, scam_type, contact_info } = req.body;

    if (!title || !description || !scam_type) {
        return res.status(400).json({ error: "Missing required fiedls"});
    }
    const query = `
    INSERT INTO reports (title, description, scam_type, contact_info)
    VALUES (?, ?, ?, ?)`;
    db.run(query, [title, description, scam_type, contact_info], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });
});

app.get("/api/reports", (req, res) => {
    db.all("SELECT * FROM reports ORDER BY created_at DESC", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } res.json(rows);
    });
});

app.get("/api/reports/type/:type", (req, res) => {
    const {type}= req.params;

    db.all(
        "SELECT * FROM reports where scam_type =?",
        [type],
        (err, rows) => {
            if (err) {
                return res._construct.status(500).json({error: err.message});
            } res.json(rows);
        }
    );
})