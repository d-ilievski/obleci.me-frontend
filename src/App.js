import React, { Component } from 'react';
import './App.css';
import ClientLayout from './hoc/ClientLayout/ClientLayout';
import MakeAd from './containers/MakeAd/MakeAd';
import AddItems from './containers/AddItems/AddItems';

class App extends Component {

  render() {
    return (
      <div className="App">
        <ClientLayout>
          {/*<MakeAd />*/}
          <AddItems />
        </ClientLayout>
        
      </div>
    );
  }
}

export default App;
