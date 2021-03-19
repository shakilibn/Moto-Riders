import React from 'react';
import { useParams } from 'react-router';
import Riders from '../../fakeData/fakeData.json';
import './Searchfound.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'    

const SearchFound = () => {

    const {riderName} = useParams();
    const rider = Riders.find(rider => rider.name === riderName) ;
    const {photo, name, seat, price} = rider;

    return (
        <div className="search-result d-flex justify-content-around">
            <img src={photo} alt=""/>
            <p><strong>{name}</strong></p>
            <p className="mr-5"><FontAwesomeIcon icon={faUserFriends} /> <strong>{seat}</strong></p>
            <p><strong>${price}</strong></p>            
        </div>
    );
};

export default SearchFound;