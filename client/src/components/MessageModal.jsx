import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function MessageModal({ showModal, handleCloseModal, currentMessage, setCurrentMessage, sendMessage }) {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Send a Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          size="lg"
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Type your message here..."
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="outline-success" onClick={sendMessage}>
          Send Message
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MessageModal;
