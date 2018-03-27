import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
           <NavigationItem link="/" active>
            Подари
           </NavigationItem>
           
           <NavigationItem link="/">
            Мои огласи
           </NavigationItem>

           <NavigationItem link="/">
            Локални огласи
            </NavigationItem>
        </ul>
    );
};

export default navigationItems;