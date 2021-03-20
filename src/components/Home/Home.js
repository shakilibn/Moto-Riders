import React from 'react';
import Riders from '../../fakeData/fakeData.json'
import Footer from '../Footer/Footer';
import Rider from '../Rider/Rider';
import './Home.css'

const Home = () => {
    return (
        <>
            <div className="heading-container">
                <h4 className="mb-3">Moto Riders</h4>
                <h1>Beat the Traffic</h1>
                <h1 className="mb-3">Save Time</h1>
                <p><strong>Take a Riders and save time! It’s fast, it’s cheap and it’s easy!</strong></p>
            </div>
            <div className="card-container">
                <>
                    <div className="row m-5">
                        {
                            Riders.map(rider => <Rider key={rider.id} rider={rider}></Rider>)
                        }
                    </div>
                </>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Home;