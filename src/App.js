import React, {Component} from 'react';
import './App.css';
import ClientLayout from './hoc/ClientLayout/ClientLayout';
import MakeAd from './containers/MakeAd/MakeAd';
import AddItems from './containers/AddItems/AddItems';
import {Route} from "react-router-dom";
import Home from './containers/Home/Home';

class App extends Component {

  render() {
    return (
      <div className="App">
        <ClientLayout>
          <Route exact path="/" component={Home}/>
          <Route exact path="/ad/create" component={MakeAd}/>
          <Route exact path="/ad/addItems" component={AddItems}/>
        </ClientLayout>
      </div>
    );
  }
}

export default App;
