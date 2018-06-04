import React from 'react';
import classes from './ItemInfo.css';

const itemInfo = (props) => {
    return (
        <div className={classes.ItemInfo}>
            <h2>{props.Data.n}</h2>
            <hr/>
            <p>{props.Data.d}</p>
        </div>
    );
};

export default itemInfo;