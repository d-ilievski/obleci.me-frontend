import React, {Component} from 'react';
import LocalAdsMap from '../../components/LocalAdsMap/LocalAdsMap';
import LocalAdsSidebar from '../../components/LocalAdsSidebar/LocalAdsSidebar';
import classes from './LocalAds.css';
import AdInfo from '../../components/AddItemsSidebar/AdInfo/AdInfo';
import LocalAdsSidebarItems from '../../components/LocalAdsSidebar/LocalAdsSidebarItems/LocalAdsSidebarItems'

class LocalAds extends Component {

    state = {
        lng: 21.7453,
        lat: 41.6086,
        isMarkerShown: false,
        localAds: [],
        activeAd: null,
        itemData: []
    }

    componentDidMount() {

        if (navigator && navigator.geolocation) {
            navigator
                .geolocation
                .getCurrentPosition((pos) => {
                    const coords = pos.coords;
                    this.setState({lng: coords.longitude, lat: coords.latitude, isMarkerShown: true});
                    this.fetchLocalAds(coords.latitude, coords.longitude, 3);
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
            this.setState({localAds: transformed, activeAd: 0});
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
        this.setState({activeAd: id});
        this.fetchItemsHandler();
    }

    scrollToBottom = () => {
        this.itemsEnd.scrollIntoView({ behavior: "smooth" });
    }

    render() {
        return (
            <div className={classes.LocalAds}>
                <LocalAdsMap
                    originLng={this.state.lng}
                    originLat={this.state.lat}
                    isMarkerShown={this.state.isMarkerShown}
                    localAds={this.state.localAds}
                    activeAdHandler={this.activeAdHandler}
                    scroll={this.scrollToBottom}/>
                <LocalAdsSidebar logoShow>
                    <AdInfo ad={this.state.localAds[this.state.activeAd]}/>
                    <LocalAdsSidebarItems data={this.state.itemData}/>
                    <div
                        style={{
                        float: "left",
                        clear: "both"
                    }}
                        ref={(el) => {
                        this.itemsEnd = el;
                    }}></div>
                </LocalAdsSidebar>
            </div>
        );
    }
}

export default LocalAds;