import React from 'react';
import classes from './AddItemsSidebar.css';

const addItemsSidebar = (props) => {
    return (
        <div className={classes.AddItemsSidebar}>
            <div className={classes.Description}>
                <p>
                    Одбери го огласот на кој сакаш да додадеш предмет.
                </p>
            </div>
            <select>
                <option>Оглас 1</option>
                <option>Оглас 2</option>
                <option>Оглас 3</option>
                <option>Оглас 4</option>
            </select>
            <button className={classes.AddItem}>Додади предмет</button>
            <button className={classes.Save}>Зачувај</button>
        </div>
    );
}

export default addItemsSidebar;