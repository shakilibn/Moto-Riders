import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import './RiderDetails.css';
import Riders from '../../fakeData/fakeData.json';
import SearchFound from '../SearchFound/SearchFound';
import SearchMap from '../SearchMap/SearchMap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

const RiderDetails = () => {
    const [search, setSearch] = useState(false);
    const [destination, setDestination] = useState({
        from : '',
        to : '',
        date:''
    });

    const handleBlur = (e) => {
        const newDestination ={...destination};
        newDestination[e.target.name] = e.target.value;
        setDestination(newDestination);
    }

    return (
        <div className="row">
            <div className="col-md-3">
                <div className=" details-side">                    
                    {
                        search ?
                            <div className="after-search">
                                <h4 className="mb-4 text-center">Your Search Result</h4>
                                <div className="bg-primary search-destination">
                                    <p>Date : {destination.date}</p>
                                    <p><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /> {destination.from} To {destination.to}</p>
                                </div>
                                {
                                    Riders.map(rider => <SearchFound></SearchFound>)
                                }
                            </div> :
                            <div className="before-search">
                                <h4 className="mb-4 text-center">Request Your Ride</h4>
                                
                                <label htmlFor="from">From</label>
                                <input className="form-control mb-4" onBlur={handleBlur} type="text" name="from" placeholder="From" />

                                <label htmlFor="to">To</label>
                                <input className="form-control mb-4" onBlur={handleBlur} type="text" name="to" id="" placeholder="To" />

                                <label htmlFor="date">Ride Date</label>
                                <input className="form-control mb-5" onBlur={handleBlur} type="date" name="date" id="date"/>

                                <Button onClick={() => setSearch(true)} className="text-white" size="lg" block>Search</Button>
                            </div>
                    }
                </div>
            </div>
            <div className="col-md-8">
                <SearchMap></SearchMap>
            </div>
        </div>
    );
};

export default RiderDetails;