import React from 'react';
import {withGoogleMap, GoogleMap, Marker, DirectionsRenderer} from 'react-google-maps';
import classes from './LocalAdsMapClient.css';
import {compose, withProps} from "recompose";
import iconCenter from '../../assets/Icons/center-direction.png';

// eslint-disable-next-line
const google = window.google;

const localAdsMapClient = compose(withProps({
  googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAJDA0EnoKaByED4YQoRN3z1d5HJXH-" +
      "7Uk&v=3.exp&libraries=geometry,drawing,places",
  loadingElement: <div style={{
    height: `100%`
  }}/>,
  containerElement: <div
    style={{
    height: `0 100%`,
    width: '80%',
    marginTop: '56px'
  }}/>,
  mapElement: <div style={{
      height: `100%`
    }}/>
}), withGoogleMap)(props => {

  const markerClickHandler = (key) => {
    props.activeAdHandler(key);
  }

  const renderMarkers = Object
    .keys(props.localAds)
    .map(key => {
      return <Marker
        key={key}
        onClick={() => markerClickHandler(key)}
        position={{
        lat: Number(props.localAds[key].lat),
        lng: Number(props.localAds[key].lng)
      }}/>
    });

  return (
    <div className={classes.localAdsMap}>
      <GoogleMap
        ref={(map) => map && map.panTo({lat: props.originLat, lng: props.originLng})}
        defaultZoom={15}
        defaultCenter={{
          lat: props.originLat,
          lng: props.originLng
        }}
        mapTypeId='hybrid'>

        {renderMarkers}

        {props.isMarkerShown
          ? <Marker
              position={{
              lat: props.originLat,
              lng: props.originLng
            }}
              icon={iconCenter}/>
          : null}

        <DirectionsRenderer
          directions={props.directions}
          options={{
          polylineOptions: {
            strokeColor: "cyan",
            strokeWeight: 5
          },
          markerOptions: {
            visible: false
          }
        }}/>
      </GoogleMap>
    </div>
  )
});

export default localAdsMapClient;