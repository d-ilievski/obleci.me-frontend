import React from 'react';
import classes from './AddItemsSidebar.css';
import AdInfo from './AdInfo/AdInfo';

const addItemsSidebar = (props) => {

    const renderOptions = Object
        .keys(props.Data)
        .reverse()
        .map(k => {
            //console.log(props.Data[k].n);
            return <option data-key={k} key={k}>{props.Data[k].n}</option>
        });

    const optionOnChangeHandler = (event) => {
        const selectedIndex = event.target.options.selectedIndex;

        props.optionHandler(Number(event.target.options[selectedIndex].getAttribute('data-key')));
    }

    return (
        <div className={classes.AddItemsSidebar}>
            <div className={classes.Description}>
                <p>
                    Одбери го огласот на кој сакаш да додадеш предмет.
                </p>
            </div>
            <select onChange={optionOnChangeHandler}>
                {renderOptions}
            </select>
            <AdInfo ad={props.Data[props.selected]}/>
            <button className={classes.AddItem}>Додади предмет</button>
            <button className={classes.Save}>Зачувај</button>
        </div>
    );
}

export default addItemsSidebar;