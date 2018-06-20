import React, {Component} from 'react';
import LocalAdsMapClient from '../../components/LocalAdsMapClient/LocalAdsMapClient';
import withAuth from '../../components/Authentication/WithAuth/WithAuth';
import LocalAdsSidebar from '../../components/LocalAdsSidebar/LocalAdsSidebar';
import classes from './LocalAdsClient.css';
import AdInfo from '../../components/AddItemsSidebar/AdInfo/AdInfo';
import LocalAdsSidebarItems from '../../components/LocalAdsSidebar/LocalAdsSidebarItems/LocalAdsSidebarItems';

// eslint-disable-next-line
const google = window.google;

class LocalAdsClient extends Component {

    state = {
        lng: 21.7453,
        lat: 41.6086,
        isMarkerShown: false,
        localAds: [],
        activeAd: null,
        itemData: [],
        adLat: 0,
        adLng: 0,
        dirService: null,
        directions: null
    }

    componentDidMount() {

        if (navigator && navigator.geolocation) {
            navigator
                .geolocation
                .getCurrentPosition((pos) => {
                    const coords = pos.coords;
                    this.setState({
                        lng: coords.longitude,
                        lat: coords.latitude,
                        isMarkerShown: true,
                        dirService: new google
                            .maps
                            .DirectionsService()
                    });
                    this.fetchLocalAds(coords.latitude, coords.longitude, 20);
                })
        }
    }

    fetchLocalAds = (originLat, originLng, distance) => {
        fetch(`http://localhost:8080/ad/getAds?lat=` + originLat + '&lng=' + originLng + '&d=' + distance, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('jwt')
            }
        }).then(res => {
            if (!res.ok) {
                throw Error(res.statusText);
            }
            return res.json();
        }).then(json => {
            var transformed = [];
            Object
                .keys(json)
                .map(k => {
                    if (json[k].active === 'ACTIVE') {
                        transformed.push(json[k]);
                    }
                    return null;
                })
            this.setState({localAds: transformed});
        }).catch(error => {
            console.log(error);
        });
    }

    fetchItemsHandler = (key) => {
        fetch(`http://localhost:8080/ad/kiosk/item/` + this.state.localAds[this.state.activeAd].id, {
            method: 'GET',
            headers: {
                //'Authorization': localStorage.getItem('jwt')
            }
        }).then(res => {
            if (!res.ok) {
                throw Error(res.statusText);
            }
            return res.json();
        }).then(json => {
            this.setState({itemData: json});
        }).catch(error => {
            console.log(error);
        });
    }

    activeAdHandler = (id) => {
        this.setState({activeAd: id, adLat: this.state.localAds[id].lat, adLng: this.state.localAds[id].lng});
        this.fetchItemsHandler();
        this.routeHandler(this.state.localAds[id].lat, this.state.localAds[id].lng);
    }

    routeHandler = (adLat, adLng) => {
        this.state.dirService.route({
            origin: new google
              .maps
              .LatLng(this.state.lat, this.state.lng),
            destination: new google
              .maps
              .LatLng(adLat, adLng),
            travelMode: google.maps.TravelMode.WALKING
          }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              this.setState({directions: result})
            } else {
              console.error(`error fetching directions ${result}`);
            }
          });
    }

    render() {
        return (
            <div className={classes.LocalAdsClient}>
                <LocalAdsMapClient
                    originLng={this.state.lng}
                    originLat={this.state.lat}
                    isMarkerShown={this.state.isMarkerShown}
                    localAds={this.state.localAds}
                    activeAdHandler={this.activeAdHandler}
                    directions={this.state.directions}/>
                <LocalAdsSidebar>
                    <div
                        style={{
                        height: '56px',
                        color: 'transparent'
                    }}></div>
                    <AdInfo ad={this.state.localAds[this.state.activeAd]}/>
                    <LocalAdsSidebarItems data={this.state.itemData}/>
                </LocalAdsSidebar>
            </div>

        );
    }
}

export default withAuth(LocalAdsClient);