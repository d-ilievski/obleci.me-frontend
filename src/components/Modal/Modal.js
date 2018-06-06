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
                    <span style={{
                        position: 'absolute',
                        left: '530px',
                        top: '0',
                        background: 'white',
                        borderRadius: '50px',
                        padding: '0.75em 1em',
                        textAlign: 'center',
                        cursor: 'pointer'
                    }}
                    onClick={props.toggleModal}>✖</span>
                </div>
                
            </Auxiliary>
        : null);
};

export default modal;