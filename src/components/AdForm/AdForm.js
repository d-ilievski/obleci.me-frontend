import React from 'react';
import classes from './AdForm.css';

const adForm = (props) => {
    return (
        <form className={classes.AdForm} onSubmit={props.submitHandler}>
            <label>
                Име на огласот:          
            </label>
            <input type="text" onChange={props.nameChange}/>
            <label>
                Опис:          
            </label>
            <textarea onChange={props.descChange}/>
            <label>
               Адреса:          
            </label>
            <input type="text" onChange={props.addressChange}/>
            
            <input value="ПРОДОЛЖИ" className={classes.SubmitBtn} type="submit"/>
        </form>
    );
};

export default adForm;