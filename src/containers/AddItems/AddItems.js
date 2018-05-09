import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import AddItemsSidebar from '../../components/AddItemsSidebar/AddItemsSidebar';
import ItemsList from '../../components/ItemsList/ItemsList';
import withAuth from '../../components/Authentication/WithAuth/WithAuth';

class AddItems extends Component {

    state = {
        data : [],
        activeAdId : 0,
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
                this.setState({data : json});
            });
        }.bind(this), 500);
    }

    render() {
        return (
            <Auxiliary>
                <AddItemsSidebar data={this.state.data} active={this.state.active}/>
                <ItemsList />
            </Auxiliary>
        );
    }
}

export default withAuth(AddItems);