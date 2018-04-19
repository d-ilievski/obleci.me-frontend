import React, {Component} from 'react';
import classes from './ItemsList.css';
import Item from './Item/Item';

class ItemsList extends Component {
    state = {}

    render() {
        return (
            <div className={classes.ItemsList}>
                <div className={classes.Content}>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                </div>
            </div>
        );
    }
}

export default ItemsList;