import React from 'react';
import classes from './AdForm.css';

const adForm = (props) => {
    return (
        <form className={classes.AdForm}>
            <label>
                Име на огласот:          
            </label>
            <input type="text"/>
            <label>
                Опис:          
            </label>
            <textarea/>
            <label>
               Адреса:          
            </label>
            <input type="text"/>
        </form>
    );
};

export default adForm;