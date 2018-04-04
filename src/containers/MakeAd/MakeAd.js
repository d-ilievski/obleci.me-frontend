import React, {Component} from 'react';
import AdForm from '../../components/AdForm/AdForm';
import classes from './MakeAd.css';
import MakeAdMap from '../../components/MakeAdMap/MakeAdMap';
import {geolocated} from 'react-geolocated';
import Auxiliary from '../../hoc/Auxiliary';

class MakeAd extends Component {

    state = {
        lng: 21.7453,
        lat: 41.6086,
        isMarkerShown: false
    }

    findLocationHandler = () => {
        if (this.props.isGeolocationAvailable) {
            if (this.props.isGeolocationEnabled) {
                if (this.props.coords) {
                    this.setState({lng: this.props.coords.longitude, lat: this.props.coords.latitude, isMarkerShown: true});
                }
            }
        }
    }

    setLocationHandler = (event) => {
        this.setState({
            lng: event
                .latLng
                .lng(),
            lat: event
                .latLng
                .lat(),
            isMarkerShown: true
        });
    }

    /*componentWillReceiveProps(nextProps) {
        if (this.props.isGeolocationAvailable) {
            if (this.props.isGeolocationEnabled) {
                if (this.props.coords) {
                    this.setState({lng: nextProps.coords.longitude, lat: nextProps.coords.latitude, isMarkerShown: true});
                }
            }
        }
    }*/

    render() {
        return (
            <Auxiliary className={classes.MakeAd}>
                <div className={classes.Row}>
                    <AdForm/>
                    <MakeAdMap
                        clicked={this.setLocationHandler}
                        isMarkerShown={this.state.isMarkerShown}
                        lng={this.state.lng}
                        lat={this.state.lat}/>      
                </div>
                <div className={classes.Row}>
                    <button onClick={this.findLocationHandler}>Лоцирај ме!</button>
                    <div>LAT: {this.state.lat} LNG: {this.state.lng}</div>
                </div>
            </Auxiliary>
        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false
    },
    userDecisionTimeout: 5000
})(MakeAd);