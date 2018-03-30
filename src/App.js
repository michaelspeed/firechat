import React, { Component } from 'react';
import HomeComponent from './Components/Home/home'
import { Provider } from 'react-redux'
import Store from './store/store'
import '@blueprintjs/core/lib/css/blueprint.css' // < ---- Bluprint js import
import 'antd/dist/antd.css' // <--- antd css import

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
          <HomeComponent/>
      </Provider>
    );
  }
}

export default App;
