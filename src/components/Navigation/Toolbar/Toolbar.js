import React, {Component} from 'react';
import classes from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import LogoInvert from '../../../assets/oblecime_invert.png';
//import SideDrawerToggle from '../../Buttons/SideDrawerToggle/SideDrawerToggle';

class Toolbar extends Component {
    
    render() {
        return (
            <header className={classes.Toolbar}>
                {/*<SideDrawerToggle/>*/}
                <div className={classes.Logo}>
                    <img src={LogoInvert} alt="LOGO"/>
                </div>
                <nav>
                    <NavigationItems handleLogout={this.props.handleLogout} loginStateHandler={this.props.loginStateHandler}/>
                </nav>
            </header>
        );
    }
}

export default Toolbar;