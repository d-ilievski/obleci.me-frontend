import React, {Component} from 'react';
import './App.css';
import ClientLayout from './hoc/ClientLayout/ClientLayout';
import MakeAd from './containers/MakeAd/MakeAd';
import AddItems from './containers/AddItems/AddItems';
import {Route} from "react-router-dom";
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import AuthService from './components/Authentication/AuthService/AuthService';

class App extends Component {

  constructor(props) {
    super(props);
    this.Auth = new AuthService();
  }
  
  state = {
    loggedIn: false
  }

  loginStateHandler = (value) => {
    this.setState({loggedIn: value})
  }

  handleLogout = () => {
    this
      .Auth
      .logout();
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) 
        this.setState({loggedIn : this.Auth.loggedIn()});
    }

  handleLoginSubmit = (user, pass) => {
      return  this
            .Auth
            .login(user, pass);

  }

  render() {

    const renderLoginPage = props => {
      return <Login 
              handleLoginSubmit={this.handleLoginSubmit}
              loggedIn={this.state.loggedIn}
              loginStateHandler={this.loginStateHandler}
              {...props}/>
    }

    return (
      <div className="App">
        <ClientLayout handleLogout={this.handleLogout} navbarShow={this.state.loggedIn} loginStateHandler={this.loginStateHandler}>
          <Route exact path="/" component={Home}/>

          <Route exact path="/login" render={renderLoginPage}/>

          <Route exact path="/ad/create" component={MakeAd}/>

          <Route exact path="/ad/addItems" component={AddItems}/>
        </ClientLayout>
      </div>
    );
  }
}

export default App;
