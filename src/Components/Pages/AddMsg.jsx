import { useState } from "react";
import { API } from "../api";
import "../css/AddMsg.css";

function AddMsg() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");

    try {
      await API.post("add-message/", { name, email, message });
      setSuccess("Message sent successfully!");
      setName(""); setEmail(""); setMessage("");
    } catch (err) {
      setError("Failed to send message.");
      console.error(err);
    }
  };

  return (
    <div className="contact-page">
      <h2>Contact Us</h2>
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Your Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <textarea placeholder="Your Message" value={message} onChange={e => setMessage(e.target.value)} required />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default AddMsg;
