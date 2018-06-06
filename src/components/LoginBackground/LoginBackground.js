import React from 'react';
import classes from './LoginBackground.css';
import LoginBackgroundImage from '../../assets/loginbg.jpg';

const LoginBackground = () => {
    return (
        <div className={classes.LoginBackground}>
            <div className={classes.Backdrop}></div>
            <img src={LoginBackgroundImage} alt="bg"/>
        </div>
    );
};

export default LoginBackground;