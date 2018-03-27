import React, {Component} from 'react';
import AdForm from '../../components/AdForm/AdForm';
import classes from './MakeAd.css';
import MakeAdMap from '../../components/MakeAdMap/MakeAdMap';

class MakeAd extends Component {

    state = {}

    render() {
        return (
            <div className={classes.MakeAd}>

                <AdForm/>
                <MakeAdMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={< div style = {{ height: `100%` }}/>}
                    containerElement={< div style = {{ height: `400px`, width: '300px' }}/>}
                    mapElement={< div style = {{ height: `100%` }}/>}/>

            </div>
        );
    }
}

export default MakeAd;