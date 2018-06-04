import React from 'react';
import {withGoogleMap, GoogleMap, Marker, DirectionsRenderer} from 'react-google-maps';
import classes from './LocalAdsMap.css';
import {compose, withProps, lifecycle} from "recompose";
import iconCenter from '../../assets/Icons/center-direction.png';

// eslint-disable-next-line
const google = window.google;

const localAdsMap = compose(withProps({
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
}), withGoogleMap, lifecycle({

  componentWillUnmount() {
    clearInterval(this.state.interval);
  },

  componentWillMount() {
    this.setState({activeAd: 0});
  },

  componentDidMount() {
    const DirectionsService = new google
      .maps
      .DirectionsService();
    this.interval = null;

    setTimeout(() => {
      console.log(this.props.localAds.length)
      if (this.props.localAds.length > 1) {
        this.interval = setInterval(() => {
          DirectionsService.route({
            origin: new google
              .maps
              .LatLng(this.props.originLat, this.props.originLng),
            destination: new google
              .maps
              .LatLng(this.props.localAds[this.state.activeAd].lat, this.props.localAds[this.state.activeAd].lng),
            travelMode: google.maps.TravelMode.WALKING
          }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              this.setState({directions: result})
            } else {
              console.error(`error fetching directions ${result}`);
            }
          });
          if (this.props.localAds.length - 1 === this.state.activeAd) {
            this.setState({activeAd: 0});
          } else {
            this.setState(prevState => {
              return {
                activeAd: prevState.activeAd + 1
              }
            });
          }
        }, 5000);
      } else if (this.props.localAds.length === 1) {
        DirectionsService.route({
          origin: new google
            .maps
            .LatLng(this.props.originLat, this.props.originLng),
          destination: new google
            .maps
            .LatLng(this.props.localAds[0].lat, this.props.localAds[0].lng),
          travelMode: google.maps.TravelMode.WALKING
        }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({directions: result})
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });
      }
    }, 1000);

    this.setState({interval: this.interval});
  }

}))(props => {

  const renderMarkers = Object
    .keys(props.localAds)
    .map(key => {
      return <Marker
        key={key}
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
        mapTypeId='hybrid'
        options={{
        disableDefaultUI: true
      }}>

        {props.isMarkerShown
          ? <Marker
              position={{
              lat: props.originLat,
              lng: props.originLng
            }}
              icon={iconCenter}/>
          : null}

        {renderMarkers}

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

export default localAdsMap;