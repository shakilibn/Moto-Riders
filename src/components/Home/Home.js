import React from 'react';
import Riders from '../../fakeData/fakeData.json'
import Rider from '../Rider/Rider';
import './Home.css'

const Home = () => {
    return (
        <div className="main-container">
            <>
                <div className="row m-5">
                    {
                        Riders.map(rider => <Rider key={rider.id} rider={rider}></Rider>)
                    }
                </div>
            </>
        </div>
    );
};

export default Home;