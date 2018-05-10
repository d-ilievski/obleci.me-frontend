import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import AddItemsSidebar from '../../components/AddItemsSidebar/AddItemsSidebar';
import ItemsList from '../../components/ItemsList/ItemsList';
import withAuth from '../../components/Authentication/WithAuth/WithAuth';

class AddItems extends Component {

    state = {
        data : [],
        activeAdId : 1,
    }
    
    componentDidMount() {
        setTimeout(function(){
            fetch(`http://localhost:8080/ad/myAds`, {
                method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem('jwt'),
                    'Accept': 'application/json'
                }
            }).then(res => {
                return res.json();
            }).then(json => {
                this.setState({data : json, activeAdId : (json.length-1)});
            }); 
        }.bind(this), 500);
    }

    optionHandler = key => {
        this.setState({activeAdId : key});
    }

    render() {
        return (
            <Auxiliary>
                <AddItemsSidebar Data={this.state.data} optionHandler={this.optionHandler} selected={this.state.activeAdId}/>
                <ItemsList />
            </Auxiliary>
        );
    }
}

export default withAuth(AddItems);