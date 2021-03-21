import {  Card } from 'react-bootstrap';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './Rider.css'

const Rider = (props) => {
    const { name, photo } = props.rider;
    let history = useHistory();

    const handleCardClick = () => {
        history.push(`/rider/${name}`);
    }
    
    return (
        <div className="col-md-3  rider-card my-3 text-center" onClick={handleCardClick}>
            <div className="d-flex justify-content-center">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={photo} />
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default Rider;