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
        isMarkerShown: false,
        adName: "",
        adDesc: "",
        adAddress: ""
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
            navigator
                .geolocation
                .getCurrentPosition((pos) => {
                    const coords = pos.coords;
                    this.setState({lng: coords.longitude, lat: coords.latitude, isMarkerShown: true});
                })
        }
    }

    adNameChangleHandler = (event) => {
        this.setState({adName: event.target.value});
    }

    adDescChangleHandler = (event) => {
        this.setState({adDesc: event.target.value});
    }

    adAddressChangleHandler = (event) => {
        this.setState({adAddress: event.target.value});
    }

    handleSubmit = (event) => {
        return fetch(`http://localhost:8080/ad/create`, {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('jwt'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({n: this.state.adName, d: this.state.adDesc, a: this.state.adAddress, lat: this.state.lat, lng: this.state.lng})
        }).then(res => {
            return res.json();
        }).then(this.props.history.replace('/ad/addItems'));

    }

    render() {
        return (
            <Auxiliary className={classes.MakeAd}>
                <div className={classes.Row}>
                    <AdForm
                        nameChange={this.adNameChangleHandler}
                        descChange={this.adDescChangleHandler}
                        addressChange={this.adAddressChangleHandler}
                        submitHandler={this.handleSubmit}/>
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