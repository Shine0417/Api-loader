import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import DropDownLink from './component/DropDownLink';
import WebRouter from './component/WebRouter';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div id="container">
          <DropDownLink text="選擇城市" urlParent="/sceneSpot" urlChild={this.props.citys}/>
          <WebRouter urlParent="/sceneSpot" urlChild={":city"} />
        </div >
      </Router >
    );
  }
}

export default App;
