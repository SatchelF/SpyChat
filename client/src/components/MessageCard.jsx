import React from 'react';
import { Card, Button, Form, CardFooter } from 'react-bootstrap';
import './MessageCard.css'; // Import the CSS file
import { faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MessageCard({ message })
{
  return (
    <Card className="simple-border-card">
      <Card.Body>
        <Card.Title>CODENAME: {message.codename}</Card.Title>
        <Card.Subtitle className="mb-2 time-stamp">TIME: {message.timestamp}</Card.Subtitle>
        <hr />
        <Card.Text className='scrollable-message-content'>
          {message.message}
        </Card.Text>
      </Card.Body>
      <CardFooter>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Form.Control
            size="md"
            type="password"
            placeholder="Password"
            className='password-input'
          />
          <Button variant="outline-warning" className="decrypt-button thick-outline" style={{ whiteSpace: 'nowrap' }}>
            <FontAwesomeIcon icon={faUnlock}></FontAwesomeIcon>
          </Button>
        </div>
        </CardFooter>
    </Card>
  );
}

export default MessageCard;
