import React from 'react';
import Riders from '../../fakeData/fakeData.json'
import Rider from '../Rider/Rider';

const Home = () => {
    return (
        <div className="row m-5">
            {
                Riders.map(rider => <Rider key={rider.id} rider={rider}></Rider>)
            }
        </div>
    );
};

export default Home;