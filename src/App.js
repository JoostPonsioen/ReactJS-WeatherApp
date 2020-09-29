import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import "./styles.css";

import About from './components/About';
import Navigation from './components/Navigation';
import Error from './components/Error';

import WeatherAPI from "./components/WeatherAPI";
// import SongList from "./components/SongList";
// import Opdracht2 from "./components/Opdracht2";
// import Opdracht3 from "./components/Opdracht3";
// import Opdracht4 from "./components/Opdracht4";
// import Opdracht5 from "./components/Opdracht5";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <main>
            <Navigation />
              <Switch>
                <Route path="/" component={WeatherAPI} exact/>
                <Route path="/about" component={About}/>
                <Route component={Error}/>
              </Switch>
          </main>
        </div> 
      </BrowserRouter>
    );
  }
}

export default App;
