import React, { Component } from 'react';
import './App.css';
import SceneContainer from "./SceneContainer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

class App extends Component {
  constructor() {
    super();
    this.state = {
      SceneSpots: [],
    };
  }

  componentDidMount() {
    fetch(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON`
      , {
        // method: 'GET',
        // body: undefined,
        // headers: ({
        //   'Authorization': `hmac username=${authorize.app_id}, algorithm="hmac-sha1", headers="x-date", signature="Base64(HMAC-SHA1("x-date: " + x-date , ${authorize.app_key}))"`,
        //   'x-date': Date().toLocaleString(),
        // })
      }
    ).then(response => {
      console.log(response);
      if (!response.ok) {
        throw Error("Err fetching doggies");
      }
      return response.json();
    })
      .then(alldata => {
        console.log(alldata);
        var scenes = alldata.map(function (obj) {
          var scene = {
            name: obj.Name,
            Description: obj.Description,
            url: obj.Picture.PictureUrl1
          }
          return scene;
        })

        this.setState({ SceneSpots: scenes });
      })
      .catch(error => {
        throw Error(error.message);
      })
  }

  onScroll = () => {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      console.log(window.innerHeight + " " + window.scrollY + " " + document.body.offsetHeight + " " + "================")
    }
  }

  reloadPhoto = props => {
    console.log("show city!" + props)
    fetch(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${props}?$top=30&$format=JSON`
      // , {
      //   method: 'GET',
      //   body: undefined,
      //   headers: ({
      //     'Authorization' : `hmac username=${authorize.app_id}, algorithm="hmac-sha1", headers="x-date", signature="Base64(HMAC-SHA1("x-date: " + x-date , ${authorize.app_key}))"`,
      //     'x-date' : Date().toLocaleString(),
      //   })
      // }
    ).then(response => {
      // console.log(response);
      if (!response.ok) {
        throw Error("Err fetching doggies");
      }
      return response.json();
    })
      .then(alldata => {
        console.log(alldata);
        var scenes = alldata.map(function (obj) {
          var scene = {
            name: obj.Name,
            Description: obj.Description,
            url: obj.Picture.PictureUrl1
          }
          return scene;
        })

        this.setState({ SceneSpots: scenes });
      })
      .catch(error => {
        throw Error(error.message);
      })
  }

  // const callback =
  // useBottomScrollListener(callback);

  render() {
    return (
      <Router>
        <div onScroll={this.onScroll} id="container">
          <ul class="dropdown">
            <span>選擇項目</span>
            <div class="dropdown-content">
              <li>
                <Link to="/">All SceneSpots</Link>
              </li>
              {Citys.map(obj => (<li><Link to={`/${obj.city}`} onClick={() => this.reloadPhoto(obj.city)}>{obj.city}</Link></li>))}
            </div>
          </ul>
          <Switch>
            <Route exact path="/">
              <h1>All SceneSpots</h1>
              <section className="App" >
                <SceneContainer scenes={this.state.SceneSpots} />
              </section>
            </Route>

            <Route path="/:city">
              <h1>hih</h1>
              <SceneContainer scenes={this.state.SceneSpots} />
            </Route>
          </Switch>
        </div >
      </Router >
    );

  }
}

const Citys = [
  { id: 1, city: "Taipei" },
  { id: 2, city: "NewTaipei" },
  { id: 3, city: "Tainan" },
]

const authorize = [
  { app_id: "a99f1b092c57476083484ae5c7822a40", app_key: "BZ4m0Wg-EzjesvW9ufoPSHibAMU" },
]

export default App;
