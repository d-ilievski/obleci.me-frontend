import React from 'react';
import classes from './AdInfo.css';

const adInfo = () => {
    return (
        <div className={classes.AdInfo}>
            <h5>TITLE</h5>
            <hr/>
            <p>SHORT description description description description description </p>
            <span> - INFO</span>
            <span> - INFO</span>
            <span> - INFO</span>
        </div>
    );
};

export default adInfo;