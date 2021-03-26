import React, { Component } from 'react';
import './App.css';
import SceneContainer from "./SceneContainer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { BottomScrollListener } from 'react-bottom-scroll-listener';

const pagesize = 30;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowCity: "",
      sceneSpots: [],
      scrollCount: 0,
      isLoading: false,
    };
  }

  fetchData(city, skipNum, topNum, infScroll) {
    fetch(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${city}?$skip=${skipNum}&$top=${topNum}&$format=JSON`
      , {
        // method: 'GET',
        // body: undefined,
        // headers: ({
        //   'Authorization': `hmac username=${authorize.app_id}, algorithm="hmac-sha1", headers="x-date", signature="Base64(HMAC-SHA1("x-date: " + x-date , ${authorize.app_key}))"`,
        //   'x-date': Date().toLocaleString(),
        // })
      }
    ).then(response => {
      // console.log(response);
      if (!response.ok) {
        throw Error("Err fetching scenes");
      }
      return response.json();
    })
      .then(alldata => {
        // console.log(alldata);
        var scenes = alldata.map(function (obj) {
          var scene = {
            name: obj.Name,
            Description: (obj.Description === undefined || obj.Description === "") ? obj.DescriptionDetail : obj.Description,
          }
          return scene;
        })
        if (infScroll)
          setTimeout(function () {
            this.setState({ sceneSpots: [...this.state.sceneSpots, ...scenes], isLoading: false });
          }.bind(this), 300);
        else
          this.setState({ sceneSpots: scenes, isLoading: false });
      })
      .catch(error => {
        throw Error(error.message);
      })
  }


  componentDidMount() {
    var nowCity = window.location.pathname.substr(10);
    this.setState({ nowCity: nowCity, scrollCount: 0, isLoading: true });
    this.fetchData(nowCity, 0, pagesize, false);
  }

  reloadPage = newCity => {
    if (this.state.nowCity !== newCity) {
      this.setState({ scrollCount: 0, nowCity: newCity, isLoading: true });
      this.fetchData(newCity, 0, pagesize, false);
    }
  }

  callback = () => {
    this.setState({ scrollCount: this.state.scrollCount + 1 });
    this.fetchData(this.state.nowCity, this.state.scrollCount * pagesize, pagesize, true);
  }

  render() {
    return (
      <Router>
        <div id="container">
          <BottomScrollListener onBottom={this.callback} />

          <ul className="dropdown">
            <span className="menu">選擇城市</span>
            <div className="dropdown-content">
              <li>
                <Link to="/sceneSpot" onClick={() => this.reloadPage("")}>All sceneSpots</Link>
              </li>
              {this.props.citys.map(obj => (<li key={obj.id}><Link to={`/sceneSpot/${obj.city}`} onClick={() => this.reloadPage(obj.city)}>{obj.city}</Link></li>))}
            </div>
          </ul>

          <Switch>
            <Route exact path="/">
              <Redirect to="/sceneSpot" />
            </Route>
            <Route exact path="/sceneSpot">
              <SceneContainer scenes={this.state.sceneSpots} isLoading={this.state.isLoading} />
            </Route>
            <Route path="/sceneSpot/:city">
              <SceneContainer scenes={this.state.sceneSpots} isLoading={this.state.isLoading} />
            </Route>
          </Switch>
        </div >
      </Router >
    );
  }
}



// const authorize = [
//   { app_id: "", app_key: "" },
// ]

export default App;
