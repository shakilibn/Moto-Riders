// import React from 'react';
// import map from '../../images/Map.png'
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

// const SearchMap = () => {
//     return (
//         <div>
//             {/* <img className="img-fluid mt-2" src={map} alt=""/> */}
//         </div>
//     );
// };

// export default SearchMap;

import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import './SearchMap.css'

class SearchMap extends Component {
    render() {
        const containerStyle = {
            position: 'relative',
            width: '100%',
            height: '600px'
        }
        return (
            <div className="mt-2 map-container">
                <Map style={containerStyle} google={this.props.google} center={{
                    lat: 27.914700,
                    lng: 79.656502
                    }} zoom={14}
                >

                    <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />

                </Map>
            </div>
        );
    }
}

// export default SearchMap;

export default GoogleApiWrapper({
    apiKey: ("AIzaSyDa24JhGbTIamrEbdha0x3IcDI0J7ylH7Y")
})(SearchMap)