import { Button, Card } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import './Rider.css'

const Rider = (props) => {
    const { name, photo } = props.rider;
    return (
        <div className="col-md-3 rider-card">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={photo} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Button as={Link} to={`/rider/${name}`} variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Rider;