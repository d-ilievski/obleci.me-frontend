import React, { Component } from 'react';
import './App.css';
import ClientLayout from './hoc/ClientLayout/ClientLayout';
import MakeAd from './containers/MakeAd/MakeAd';

class App extends Component {

  render() {
    return (
      <div className="App">
        <ClientLayout>
          <MakeAd />
        </ClientLayout>
        
      </div>
    );
  }
}

export default App;
