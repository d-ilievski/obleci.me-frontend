import React, {Component} from 'react';
import classes from './ItemsList.css';
import Item from './Item/Item';

class ItemsList extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.Data !== this.props.Data) {
            return true;
        }
        return false;
    }

    render() {
        const renderItems = Object
        .keys(this.props.Data)
        .reverse()
        .map(k => {
            return <Item data-key={k} key={k} Data={this.props.Data[k]} toggleAvailable={this.props.toggleAvailable}/>
        });

        return (
            <div className={classes.ItemsList}>
                <div className={classes.Content}>
                    {renderItems.length === 0 ? <h3>Додади предмети на овој оглас.</h3> : renderItems}
                </div>
            </div>
        );
    }
}

export default ItemsList;