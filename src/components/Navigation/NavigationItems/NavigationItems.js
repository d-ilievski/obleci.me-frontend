import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';
import {Link} from 'react-router-dom';

const navigationItems = (props) => {

    const logout = () => {
        props.loginStateHandler(false);
        props.handleLogout()
}

return (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/ad/create">
            Подари
        </NavigationItem>

        <NavigationItem link="/ad/addItems">
            Мои огласи
        </NavigationItem>

        <NavigationItem link="/">
            Локални огласи
        </NavigationItem>

        <li className={classes.Logout}>
            <Link to='/login'>
                <button onClick={logout}>Одјави се!</button>
            </Link>
        </li>
    </ul>
);
};

export default navigationItems;