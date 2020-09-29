import React from "react";
import weerIMG from "../img/weer.png";

class WeatherAPI extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      tekst: ""
    };
  }

  // input veld, als het input veld leeg is maakt hij de alert (niet gevonden) leeg zo niet vult hij de value in
  updateInput = (event) => {
    if (event.target.value === ""){
      document.getElementById("alert").innerHTML = "";
    } else {
      this.getWeather(event.target.value);
    }
  }

  // extra informatie wanneer je op de knop meer informatie klikt over de weer
  // wanneer je op de onclick hidestatus klikt doet hij display block en komt het tevoorschijn standaard ingesteld op display none
  // status = status van de weer
  // description voorbeeld bewolkt
  hideStatus = () => {
    document.getElementById("status").style.display = "block";
    document.getElementById("description").style.display = "block";
  }

  // tempratuur berekenen
  celsius(temp) {
    let celsius = Math.floor(temp - 273.15);
    return celsius;
  }

  getWeather = (city) => {
    // api call: api.openweathermap.org/data/2.5/weather?q=City&appid=API_Key
    const API_Key = "e23a1892a1d9e6b0d6127c8c55d05352";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}`;
    // eslint-disable-next-line
    fetch(url).then(response => response.json()).then(data => {
      this.setState({
        // vul de variabelen in met data van api
        city: data.name,
        country: data.sys.country,
        temp: this.celsius(data.main.temp),
        temp_max: this.celsius(data.main.temp_max),
        temp_min: this.celsius(data.main.temp_min),
        description: data.weather[0].description
      });
      // Als die een plaats succesvol vind haalt hij de alert (niet gevonden) weg en komt de button meer informatie tevoorschijn
      document.getElementById("alert").innerHTML = "";
      document.getElementById("button").style.display = "block";
      console.clear();
    })
    .catch((error) => {
      // Als die een plaats niet vind haalt hij de button en meer informatie weg en komt er alert met niks gevonden
      document.getElementById("alert").innerHTML = "Niks gevonden.";
      document.getElementById("button").style.display = "none";
      document.getElementById("status").style.display = "none";
      document.getElementById("description").style.display = "none";

      console.log(error);
      this.setState({
        // hier maakt vervolgens elke variabelen weer leeg
        city: undefined,
        country: undefined,
        temp: undefined,
        temp_max: undefined,
        temp_min: undefined,
        description: undefined
      })
    })
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <img className="weer" src={weerIMG} alt="weer logo" />
              <div className="head">
                <h1>React Weather App</h1>
                <h5>Made by: <small>Joost & Batuhan</small></h5>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <form name="form">
                <input type="text" name="input" className="form-control" placeholder="Voer een plaats in" onChange={(e) => this.updateInput(e)}></input>
              </form>
              <div className="informatie">
                <button id="button" onClick={this.hideStatus} type="button" className="btn btn-info">Meer informatie</button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p id="alert"></p>
              <h2 className="city"> {this.state.city} - {this.state.country} </h2>
              <p className="temp">Temperatuur: {this.state.temp}&#8451;</p>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Min</th>
                    <th scope="col">Max</th>
                    <th id="status" scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{this.state.temp_min}&#8451;</td>
                    <td>{this.state.temp_max}&#8451;</td>
                    <td id="description" className="desc">{this.state.description}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherAPI;