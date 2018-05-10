import React from 'react';
import classes from './AdInfo.css';

const adInfo = props => {

    const activityColor = status => {
        if(status === "ACTIVE")
            return "green";
        else if(status === "INACTIVE")
            return "red";
        else return "grey";
    } 

    return (
        <div className={classes.AdInfo}>
            <h5>{{...props.ad}.n}</h5>
            <hr/>
            <p>{{...props.ad}.d}</p>
            <span>Статус: </span>
            <span style={{color : activityColor({...props.ad}.active), fontSize : "2em"}}>●</span>
        </div>
    );
};

export default adInfo;