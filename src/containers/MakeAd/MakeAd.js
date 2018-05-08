import React, {Component} from 'react';
import AdForm from '../../components/AdForm/AdForm';
import classes from './MakeAd.css';
import MakeAdMap from '../../components/MakeAdMap/MakeAdMap';
import Auxiliary from '../../hoc/Auxiliary';
import withAuth from '../../components/Authentication/WithAuth/WithAuth';

class MakeAd extends Component {

    state = {
        lng: 21.7453,
        lat: 41.6086,
        isMarkerShown: false
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

    componentDidMount() {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const coords = pos.coords;
                this.setState({
                    lng: coords.longitude,
                    lat: coords.latitude,
                    isMarkerShown: true
                });
            })
        }
    }
    

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
            </Auxiliary>
        );
    }
}

export default withAuth(MakeAd);