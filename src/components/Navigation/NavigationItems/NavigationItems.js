import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';


const navigationItems = (props) => {
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
        </ul>
    );
};

export default navigationItems;