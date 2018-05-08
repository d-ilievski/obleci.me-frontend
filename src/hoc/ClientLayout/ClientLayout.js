import React, {Component} from 'react';
import classes from './ClientLayout.css';
import Auxiliary from '../Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import {BrowserRouter} from "react-router-dom";

class ClientLayout extends Component {

    render() {
        return (
            <BrowserRouter>
                <Auxiliary>
                    <main className={classes.Content}>
                        {this.props.navbarShow
                            ? <Toolbar handleLogout={this.props.handleLogout} loginStateHandler={this.props.loginStateHandler}/>
                            : null}
                        {this.props.children}
                    </main>
                </Auxiliary>
            </BrowserRouter>
        );
    }

}

export default ClientLayout;