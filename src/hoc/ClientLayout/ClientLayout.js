import React, {Component} from 'react';
import classes from './ClientLayout.css';
import Auxiliary from '../Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import {HashRouter} from "react-router-dom";

class ClientLayout extends Component {

    render() {
        return (
            <HashRouter>
                <Auxiliary>
                    <Toolbar/>
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
                </Auxiliary>
            </HashRouter>
        );
    }

}

export default ClientLayout;