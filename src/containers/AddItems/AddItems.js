import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import AddItemsSidebar from '../../components/AddItemsSidebar/AddItemsSidebar';
import ItemsList from '../../components/ItemsList/ItemsList';
import withAuth from '../../components/Authentication/WithAuth/WithAuth';

class AddItems extends Component {

    state = {
    }

    render() {
        return (
            <Auxiliary>
                <AddItemsSidebar />
                <ItemsList />
            </Auxiliary>
        );
    }
}

export default withAuth(AddItems);