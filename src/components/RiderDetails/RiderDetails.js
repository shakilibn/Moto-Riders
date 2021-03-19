import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import './RiderDetails.css';
import Riders from '../../fakeData/fakeData.json';
import SearchFound from '../SearchFound/SearchFound';
import SearchMap from '../SearchMap/SearchMap';

const RiderDetails = () => {
    const [search, setSearch] = useState(false);
    const [destination, setDestination] = useState({
        from : '',
        to : ''
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
                                <div className="bg-primary search-destination">
                                    <p>{destination.from}</p>
                                    <p>{destination.to}</p>
                                </div>
                                {
                                    Riders.map(rider => <SearchFound></SearchFound>)
                                }
                            </div> :
                            <div className="before-search">
                                <p>From</p>
                                <input className="form-control" onBlur={handleBlur} type="text" name="from" placeholder="From" />
                                <p className="mt-4">To</p>
                                <input className="form-control" onBlur={handleBlur} type="text" name="to" id="" placeholder="To" />
                                <br />
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