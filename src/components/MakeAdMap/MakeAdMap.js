import React from 'react';
import { withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import classes from './MakeAdMap.css';
import {compose, withProps} from "recompose";


const makeAdMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAJDA0EnoKaByED4YQoRN3z1d5HJXH-" +
        "7Uk&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{
      height: `100%`
    }}/>,
    containerElement: <div style={{
      height: `500px`,
      width: '50%',
      margin: '20px 40px'
    }}/>,
    mapElement: <div style={{
        height: `100%`
      }}/>
  }),

  withGoogleMap)(props => {

  return (
    <div className={classes.MakeAdMap}>
      <GoogleMap
        ref={(map) => map && map.panTo({lat: props.lat, lng: props.lng})}
        defaultZoom={15}
        defaultCenter={{
          lat: props.lat,
          lng: props.lng
        }}
        mapTypeId='hybrid'
        onClick={props.clicked}
      >

        {props.isMarkerShown ?
        <Marker position={{
          lat: props.lat,
          lng: props.lng
        }}/>
        : null}
      </GoogleMap>
    </div>
  )
});

export default makeAdMap;