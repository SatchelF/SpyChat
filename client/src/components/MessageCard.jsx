import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './MessageCard.css'; // Import the CSS file
import { faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MessageCard({ message }) {
    return (
        <Card className="simple-border-card">
          <Card.Body>
            <Card.Title>CODENAME: {message.codename}</Card.Title>
            <Card.Subtitle className="mb-2 time-stamp">TIME: {message.timestamp}</Card.Subtitle>
            <hr />
            <Card.Text style={{color: '#FFB000'}}>
              {message.message}
            </Card.Text>
            <Button variant="outline-warning" className="decrypt-button thick-outline">
              <FontAwesomeIcon icon={faUnlock}></FontAwesomeIcon>
            </Button>
          </Card.Body>
        </Card>
    );
}

export default MessageCard;
