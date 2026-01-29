import { useEffect, useState } from "react";
import "./App.css"

function App() {
  const [reports, setReports] = useState ([]);
  const [filter, setFilter] = useState ([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scamType, setScamType] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  
  useEffect(() => {fetchReports(); }, []);

  function fetchReports() {
    fetch("http://localhost:5000/api/reports")
    .then((res) => res.json())
    .then((data) => setReports(data))
    .catch((err) => console.error(err));
  }

  function submitReport(e) {
    e.preventDefault();

    fetch("http://localhost:5000/api/reports", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        title,
        description,
        scam_type: scamType,
        contact_info: contactInfo
      }),
    })
    .then((res) => res.json())
    .then(() => {
      setTitle("");
      setDescription("");
      setScamType("");
      setContactInfo("");
      fetchReports();
    })
    .catch((err) => console.error(err));
  }
  
  return (
    <div className="container">
      <h1 className="title">SCAM BUSTERS</h1>
      <div className="card form-card">
      <form onSubmit={submitReport}>
        <input 
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)} 
        required/> <br />

        <textarea 
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required/> <br />

        <select
        value={scamType}
        onChange={(e) => setScamType(e.target.value)}
        required>
        <option className="drops" value="">Select scam type---</option>
        <option className="drops" value="Deepfake">Deepfake</option>
        <option className="drops" value="Voice Spoofing">Voice Spoofing</option>
        <option className="drops" value="Fake News">Fake News</option>
        <option className="drops" value="Phishing">Phishing</option>
        <option className="drops" value="Other">Other</option>
        </select>
        <br />

        <input
        placeholder="Contact Info"
        value={contactInfo}
        onChange={(e) => setContactInfo(e.target.value)}
        /> <br />

        <button type="submit">SUBMIT</button>
      </form>
      </div>
      <hr />

    <label>
      <p className="subtitle">Sorted by latest</p>
      Filter by scam type:{" "}
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option className="drops" value="">All</option>
        <option className="drops" value="Deepfake">Deepfake</option>
        <option className="drops" value="Voice Spoofing">Voice Spoofing</option>
        <option className="drops" value="Fake News">Fake News</option>
        <option className="drops" value="Phishing">Phishing</option>
        <option className="drops" value="Other">Other</option>
      </select>
    </label>

      <div className="reports">
      {reports
          .filter((r) => !filter || r.scam_type === filter)
          .map((report) =>(
          <div className="card report-card" key={report.id}>
            <h3>{report.title}</h3>
            <p className="type">{report.scam_type}</p>
            <p className="date">
              {new Date(report.created_at).toLocaleString()}
            </p>
          <p>{report.description}</p>
          </div>
        ))}
    </div></div>
  );
}

export default App;
