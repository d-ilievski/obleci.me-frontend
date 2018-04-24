import React from 'react';
import classes from './ItemInfo.css';

const itemInfo = (props) => {
    return (
        <div className={classes.ItemInfo}>
            <h2>ITEM TITLE</h2>
            <hr/>
            <p>item description item description item description item description item description item description item description item description </p>
        </div>
    );
};

export default itemInfo;