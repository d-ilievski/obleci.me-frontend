import React from 'react';
import classes from './LocalAdsSidebar.css';
import LogoInvert from '../../assets/oblecime_invert.png';

const localAdsSidebar = (props) => {
    return (
        <div className={classes.LocalAdsSidebar}>
            {props.logoShow ? <div className={classes.Logo}>
                        <img src={LogoInvert} alt="LOGO" />
            </div> : null}
            {props.children}
        </div>
    );
};

export default localAdsSidebar;