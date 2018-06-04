import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {

    return (props.show
        ? <Auxiliary>
                <Backdrop click={props.toggleModal}/>
                <div className={classes.Modal}>
                    {props.children}
                </div>
            </Auxiliary>
        : null);
};

export default modal;