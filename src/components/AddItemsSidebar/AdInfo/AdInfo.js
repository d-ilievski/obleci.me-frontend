import React, {Component} from 'react';
import classes from './AdInfo.css';

class AdInfo extends Component {

    activityColor = status => {
        if(status === "ACTIVE")
            return "green";
        else if(status === "INACTIVE")
            return "red";
        else return "grey";
    }

    render() {

        return (
            <div className={classes.AdInfo}>
                <h5>{{...this.props.ad}.n}</h5>
                <hr/>
                <p>{{...this.props.ad}.d}</p>
                <span>Статус: </span>
                <span style={{color : this.activityColor({...this.props.ad}.active), fontSize : "2em"}}>●</span>
            </div>
        );
    }

}
export default AdInfo;