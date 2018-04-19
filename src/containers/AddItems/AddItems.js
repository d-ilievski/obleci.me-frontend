import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import AddItemsSidebar from '../../components/AddItemsSidebar/AddItemsSidebar';
import ItemsList from '../../components/ItemsList/ItemsList';

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

export default AddItems;