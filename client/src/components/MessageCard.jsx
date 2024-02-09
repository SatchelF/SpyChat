// MessageCard.js
import React from 'react';
import { Card } from 'react-bootstrap';

function MessageCard({ message }) {
    return (
        <Card style={{ width: '18rem',height: '22rem', backgroundColor:'white' }}>
          <Card.Body>
            <Card.Title>Codename: {message.codename}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Time: {message.timestamp}</Card.Subtitle>
            <Card.Text>
              {message.message}
            </Card.Text>
            {/* <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link> */}
          </Card.Body>
        </Card>
      );
}

export default MessageCard;
