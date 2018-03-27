import React from 'react';
import classes from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerToggle from '../../Buttons/SideDrawerToggle/SideDrawerToggle';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <SideDrawerToggle/>
            <div>LOGO</div>
            <nav>
                <NavigationItems />
            </nav>
        </header>
    );
};

export default toolbar;