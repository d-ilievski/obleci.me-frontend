import React from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';

const makeAdMap = withScriptjs(withGoogleMap(props => {

  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{
        lat: -34.397,
        lng: 150.644}}>

      <Marker position={{
        lat: -34.397,
        lng: 150.644
      }}/>

    </GoogleMap>
  )
}));

export default makeAdMap;