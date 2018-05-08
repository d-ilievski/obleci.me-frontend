import React, {Component} from 'react';
import classes from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
//import SideDrawerToggle from '../../Buttons/SideDrawerToggle/SideDrawerToggle';

class Toolbar extends Component {
    
    render() {
        return (
            <header className={classes.Toolbar}>
                {/*<SideDrawerToggle/>*/}
                <div>LOGO</div>
                <nav>
                    <NavigationItems handleLogout={this.props.handleLogout} loginStateHandler={this.props.loginStateHandler}/>
                </nav>
            </header>
        );
    }
}

export default Toolbar;