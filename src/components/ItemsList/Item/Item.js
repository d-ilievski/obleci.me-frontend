import React from 'react';
import classes from './Item.css';
import ItemInfo from './ItemInfo/ItemInfo';
//import Auxiliary from '../../../hoc/Auxiliary';

const item = (props) => {
    return (

        <div className={classes.Item}>
            <a href="/" className={classes.Link}>
                <img
                    src="http://via.placeholder.com/350x350"
                    alt="/"
                    className={classes.Thumbnail}/>
                <ItemInfo/>
            </a>
            <a href="/" className={classes.Link}>
                <img
                    src="https://image.flaticon.com/icons/svg/18/18297.svg"
                    alt="/"
                    style={{
                    width: "20px",
                    height: "20px"
                }}/>
            </a>
        </div>

    );
};

export default item;