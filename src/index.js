import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch } from 'react-router-dom';


const CITYS = [
  { id: 1, city: "Taipei" },
  { id: 2, city: "NewTaipei" },
  { id: 3, city: "Taoyuan" },
  { id: 4, city: "Taichung" },
  { id: 5, city: "Tainan" },
  { id: 6, city: "Kaohsiung" },
  { id: 7, city: "Keelung" },
  { id: 8, city: "Hsinchu" },
  { id: 9, city: "HsinchuCounty" },
  { id: 10, city: "MiaoliCounty" },
  { id: 11, city: "ChanghuaCounty" },
  { id: 12, city: "NantouCounty" },
  { id: 13, city: "YunlinCounty" },
  { id: 14, city: "ChiayiCounty" },
  { id: 15, city: "Chiayi" },
  { id: 16, city: "PingtungCounty" },
  { id: 17, city: "YilanCounty" },
  { id: 18, city: "HualienCounty" },
  { id: 19, city: "TaitungCounty" },
  { id: 20, city: "KinmenCounty" },
  { id: 21, city: "PenghuCounty" },
  { id: 22, city: "LienchiangCounty" },
]

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <App citys={CITYS}/>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();