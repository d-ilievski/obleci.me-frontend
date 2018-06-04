import React, {Component} from 'react';
import LocalAdsMap from '../../components/LocalAdsMap/LocalAdsMap';
import withAuth from '../../components/Authentication/WithAuth/WithAuth';
import LocalAdsSidebar from '../../components/LocalAdsSidebar/LocalAdsSidebar';
import classes from './LocalAds.css';

class LocalAds extends Component {

    state = {
        lng: 21.7453,
        lat: 41.6086,
        isMarkerShown: false,
        localAds: []
    }

    componentDidMount() {
        
        if (navigator && navigator.geolocation) {
            navigator
                .geolocation
                .getCurrentPosition((pos) => {
                    const coords = pos.coords;
                    this.fetchLocalAds(coords.latitude, coords.longitude, 3);
                    this.setState({lng: coords.longitude, lat: coords.latitude, isMarkerShown: true});
                })
        }
    }

    fetchLocalAds = (originLat, originLng, distance) => {

        fetch(`http://localhost:8080/ad/getAds?lat=`+originLat+'&lng='+originLng+'&d='+distance, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('jwt'),
            }
        }).then(res => {
            if (!res.ok) {
                throw Error(res.statusText);
            }
            return res.json();
        }).then(json => {
            this.setState({localAds : json})
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className={classes.LocalAds}>
                <LocalAdsMap
                    originLng={this.state.lng}
                    originLat={this.state.lat}
                    isMarkerShown={this.state.isMarkerShown}
                    localAds={this.state.localAds}/>
                <LocalAdsSidebar/>
            </div>
        );
    }
}

export default withAuth(LocalAds);