import { useEffect, useState } from "react";
import axios from "axios";
import '../css/Viewmsg.css';
const API = "http://127.0.0.1:8000/api/";

function ViewMsg() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${API}view-messages/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setMessages(res.data);
      } catch (err) {
        setError("Failed to load messages. Only superusers can view.");
        console.error(err);
      }
    };
    fetchMessages();
  }, [token]);
const deleteMessage = async (id) => {
  try {
    await axios.delete(`${API}delete-message/${id}/`, {
      headers: { Authorization: `Token ${token}` }
    });
    setMessages(messages.filter((m) => m.id !== id));
  } catch (err) {
    console.error(err);
    alert("Failed to delete message.");
  }
};
  return (
    <div className="view-messages-page">
      <h2>Contact Messages</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {messages.map((m) => (
            <li
              key={m.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            >
              <strong>Name:</strong> {m.name} <br />
              <strong>Message:</strong> {m.message} <br />
              <strong>Email:</strong> {m.email} <br />
              <button
                onClick={() => deleteMessage(m.id)}
                style={{
                  marginTop: "5px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewMsg;
