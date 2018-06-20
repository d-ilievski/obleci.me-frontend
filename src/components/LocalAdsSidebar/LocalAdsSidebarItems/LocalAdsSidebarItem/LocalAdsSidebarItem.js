import React from 'react';
import classes from './LocalAdsSidebarItem.css';

const localAdsSidebarItem = (props) => {
    return (
        <div className={classes.LocalAdsSidebarItem}>
            <div className={classes.ItemContainer}>
                <div className={classes.Thumbnail}>
                    <img src={props.data.ip} alt="Сликата не е достапна!"/>
                </div>
                <div className={classes.ItemInfo}>
                    <span className={classes.ItemName}>{props.data.n}</span>
                    <p style={{color: 'white', fontSize: '0.8em'}}>{props.data.d}</p>
                </div>
            </div>
            <hr style={{height : '0.5px'}}/>
        </div>
    );
};

export default localAdsSidebarItem;