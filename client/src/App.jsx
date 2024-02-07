import { useEffect, useState } from 'react';
import './App.css';
import {io} from "socket.io-client";
import Header from "./components/Header";
import Button from 'react-bootstrap/Button';

function App() {
  const [count, setCount] = useState(0)
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const s = io();
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    const callback = (newCount) => {
      setCount(newCount);
      if (loading) {
        setLoading(false);
      }
    }
    socket.on("new state", callback);
    return () => {
      socket.off("new state", callback);
    }
  }, [socket, loading]);

  function increment() {
    socket.emit("increment");
  }

  function decrement() {
    socket.emit("decrement");
  }

  return (
    <>
    <div className="main-container">
      <Header></Header>\
      <hr></hr>
      <Button variant="outline-primary">Primary</Button>{' '}
      <Button variant="outline-secondary">Secondary</Button>{' '}
      <Button variant="outline-success">Success</Button>{' '}
      <Button variant="outline-warning">Warning</Button>{' '}
      <Button variant="outline-danger">Danger</Button>{' '}
      <Button variant="outline-info">Info</Button>{' '}
      <Button variant="outline-light">Light</Button>{' '}
      <Button variant="outline-dark">Dark</Button>
    </div>
    </>
  )
}

export default App