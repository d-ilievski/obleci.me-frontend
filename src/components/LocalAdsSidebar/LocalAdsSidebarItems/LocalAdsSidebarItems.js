import React from 'react';
import classes from './LocalAdsSidebarItems.css';
import LocalAdsSidebarItem from './LocalAdsSidebarItem/LocalAdsSidebarItem';

const localAdsSidebarItems = props => {

    const renderItems = Object
        .keys(props.data)
        .reverse()
        .map(k => {
            return <LocalAdsSidebarItem key={k} data={props.data[k]}/>
        });

    return (
        <div className={classes.localAdsSidebarItems}>
            {renderItems}
        </div>
    );
};

export default localAdsSidebarItems;