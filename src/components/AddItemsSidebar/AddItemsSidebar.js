import React, {Component} from 'react';
import classes from './AddItemsSidebar.css';
import AdInfo from './AdInfo/AdInfo';

class AddItemsSidebar extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.Data !== {
            ...this.props.Data
        }) 
            return true;
        return false;
    }

    optionOnChangeHandler = (event) => {
        const selectedIndex = event.target.options.selectedIndex;
        this
            .props
            .optionHandler(Number(event.target.options[selectedIndex].getAttribute('data-key')));
    }

    render() {
        var renderOptions = Object
            .keys(this.props.Data)
            .reverse()
            .map(k => {
                //console.log(props.Data[k].n);
                return <option data-key={k} key={k}>{this.props.Data[k].n}</option>
            });

        var cls = [];
        cls.push(classes.AddItem);
        if (this.props.DisabledButton) 
            cls.push(classes.Disabled);
        
        return (
            <div className={classes.AddItemsSidebar}>
                <div className={classes.Description}>
                    <p>
                        Одбери го огласот на кој сакаш да додадеш предмет.
                    </p>
                </div>
                <select onChange={this.optionOnChangeHandler}>
                    {renderOptions}
                </select>
                <AdInfo ad={this.props.Data[this.props.selected]}/>
                <button
                    disabled={this.props.DisabledButton}
                    className={cls.join(" ")}
                    onClick={this.props.addItemHandler}>Додади предмет</button>
            </div>
        );
    }
}
export default AddItemsSidebar;