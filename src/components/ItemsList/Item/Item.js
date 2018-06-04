import React from 'react';
import classes from './Item.css';
import ItemInfo from './ItemInfo/ItemInfo';
import ToggleOn from 'react-icons/lib/fa/toggle-on'
import ToggleOff from 'react-icons/lib/fa/toggle-off';
import Trash from 'react-icons/lib/fa/trash-o';

const item = (props) => {

    return (

        <div className={classes.Item}>
            <a className={classes.Link}>
                <img
                    src={props.Data.ip}
                    alt="Сликата не е достапна."
                    className={classes.Thumbnail}/>
                <ItemInfo Data={props.Data}/>
            </a>
            <div>
                {props.Data.s === 'AVAILABLE'
                    ? <ToggleOn
                            onClick={() => props.toggleAvailable(props.Data.id, "NOT_AVAILABLE")}
                            className={[classes.Available, classes.Toggle].join(" ")}/>
                    : <ToggleOff
                        onClick={() => props.toggleAvailable(props.Data.id, "AVAILABLE")}
                        className={[classes.Unavailable, classes.Toggle].join(" ")}/>
                }
                <Trash onClick={() => props.toggleAvailable(props.Data.id, "DELETED")} className={classes.Toggle}/>
            </div>
        </div>

    );
};

export default item;