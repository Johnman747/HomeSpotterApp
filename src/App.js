import { React, Component } from 'react';
import axios from 'axios';
import { Button, AutoComplete, Switch, Card } from 'antd';
import moment from 'moment';
import WeatherCard from './WeatherCard';
import './App.css';

class App extends Component {
  state = {
    location: '',
    locationSearch: [],
    currentWeather: '',
    degreeState: true
  }

  //call to weather api for city names that api covers
  getLocation = (e) => {
    let location = e
    axios.get(`http://api.weatherapi.com/v1/search.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${location}`).then(response => {
      // console.log(response.data);
      let newArray = [];
      response.data.forEach(option => {
        newArray.push({ value: option.name });
      });
      // console.log(newArray);
      this.setState({ locationSearch: newArray });
    })
  }

  //Set selected city as location for weather sharch
  setLocation = (e) => {
    // console.log(e)
    this.setState({ location: e });
  }

  //call to API tp get the forecast and current weather reports for searched location
  getWeather = () => {
    axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${this.state.location}&days=3`).then(response => {
      // console.log(response.data);
      this.setState({
        currentWeather: response.data
      })
    })
  }

  render() {
    let weather = this.state.currentWeather
    return (
      <div className="App">
        {/* search box and degree switch */}
        <div className="searchField">
          <AutoComplete
            style={{ width: 200 }}
            onChange={(e) => this.getLocation(e)}
            options={this.state.locationSearch}
            onSelect={(e) => this.setLocation(e)}
          ></AutoComplete>
          <Button
            type="primary"
            onClick={() => this.getWeather()}
          >Search</Button>
          <Switch
            checked={this.state.degreeState}
            onClick={() => this.setState({ degreeState: !this.state.degreeState })}
            checkedChildren={`F`}
            unCheckedChildren={`C`}
          />
        </div>
        {this.state.currentWeather !== '' &&
          <div>
            {/* display of current weather */}
            <div>
              <h1>{weather.location.name}, {weather.location.region}</h1>
              <WeatherCard day={weather.current} weatherType='current' degreeState={this.state.degreeState} />
            </div>
            {/* display of 3 day forecast */}
            <div>
              <h1>3-Day Forecast</h1>
              {weather.forecast.forecastday.map(day => {
                return (
                  <WeatherCard day={day} weatherType='forecast' degreeState={this.state.degreeState}/>
                )
              })}
            </div>
          </div>
        }
      </div>
    )
  }
}

export default App;
