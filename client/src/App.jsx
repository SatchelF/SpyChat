import { useEffect, useState } from 'react';
import './App.css';
import { io } from "socket.io-client";
import Header from "./components/Header";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const socket = io.connect();

function App() {
  const [message, setMessage] = useState("");
  const [messagesReceived, setMessagesReceived] = useState([]);

  const sendMessage = () => {
    if (message.trim()) { // Ensure we don't send empty messages
      socket.emit("send_message", { message });
      setMessage(''); // Clear the input after sending
    }
  };

  useEffect(() => {
    const receiveMessage = (data) => {
      setMessagesReceived(messagesReceived => [...messagesReceived, data.message]);
    };
  
    socket.on("receive_message", receiveMessage);
  
    // Cleanup logic
    return () => {
      socket.off("receive_message", receiveMessage);
    };
  }, []); // Empty array means this effect runs only once on mount
  

  return (
    <>
      <div className="main-container">
        <Header></Header>
        <hr></hr>
        <Form.Control size="lg" type="text" onChange={(event) => setMessage(event.target.value)} placeholder="Message" />
        <Button variant="outline-success" onClick={sendMessage}>Send Message</Button>
        <h1 style={{ color: '#00FF66' }}>Messages:</h1>
        <div>
          {messagesReceived.map((message, index) => (
            <p style={{ color: '#00FF66' }} key={index}>{message}</p> // Apply the color style directly here
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
