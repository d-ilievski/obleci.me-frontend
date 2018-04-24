import React from 'react';
import classes from './NavigationItem.css';
import {NavLink} from "react-router-dom";

const navigationItem = (props) => {
    return (
        <NavLink className={classes.NavigationItem} activeStyle={{color: "#66fcf1", borderBottom: "4px solid #66fcf1"}} to={props.link}>
            <li >
                {props.children}
            </li>
        </NavLink>
    );
};

export default navigationItem;