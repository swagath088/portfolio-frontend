import { useEffect, useState } from "react";
import { API } from "../api";
import "../css/Viewmsg.css";

function ViewMsg() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMessages = async () => {
      try { const res = await API.get("view-messages/"); setMessages(res.data); } 
      catch (err) { setError("Failed to load messages."); console.error(err); }
    };
    fetchMessages();
  }, [token]);

  const deleteMessage = async id => {
    try { await API.delete(`delete-message/${id}/`); setMessages(prev => prev.filter(m => m.id !== id)); } 
    catch(err) { console.error(err); alert("Failed to delete message."); }
  };

  return (
    <div className="view-messages-page">
      <h2>Contact Messages</h2>
      {error && <p style={{ color:"red" }}>{error}</p>}
      {messages.length === 0 ? <p>No messages.</p> : (
        <ul style={{ listStyle:"none", padding:0 }}>
          {messages.map(m => (
            <li key={m.id} style={{ border:"1px solid #ccc", padding:10, marginBottom:10, borderRadius:5 }}>
              <strong>Name:</strong> {m.name} <br />
              <strong>Email:</strong> {m.email} <br />
              <strong>Message:</strong> {m.message} <br />
              <button onClick={() => deleteMessage(m.id)} style={{ marginTop:5, backgroundColor:"red", color:"white", border:"none", padding:"5px 10px", borderRadius:3, cursor:"pointer" }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewMsg;
