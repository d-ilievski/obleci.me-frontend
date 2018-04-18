import React, {Component} from 'react';
import classes from './ClientLayout.css';
import Auxiliary from '../Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

class ClientLayout extends Component {

    render() {
        return (
            <Auxiliary>
                <Toolbar />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }

}

export default ClientLayout;