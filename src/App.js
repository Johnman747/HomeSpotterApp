import { React, Component } from 'react';
import axios from 'axios';
import { Button, AutoComplete, Switch } from 'antd';
import WeatherCard from './WeatherCard';
import './App.css';

class App extends Component {
  state = {
    location: '',
    locationSearch: [],
    currentWeather: '',
    degreeState: true,
    active: 'current'
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
      this.setState({location:e, locationSearch: newArray });
    })
  }

  //Set selected city as location for weather sharch
  setLocation = (e) => {
    // console.log(e)
    this.setState({ location: e });
  }

  //call to API tp get the forecast and current weather reports for searched location
  getWeather = () => {
    axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${this.state.location}&days=10`).then(response => {
      console.log(response.data);
      this.setState({
        currentWeather: response.data
      })
    })
  }

  setActive = (input) => {
    this.setState({ active: input });
  }

  render() {
    let weather = this.state.currentWeather
    return (
      <div className="App">
        {/* search box and degree switch */}
        <div className="searchField">
          <AutoComplete
            className="SearchInput"
            data-testid="input"
            style={{ width: 200, margin: 5 }}
            onChange={(e) => this.getLocation(e)}
            placeholder="Enter city here"
            options={this.state.locationSearch}
            onSelect={(e) => this.setLocation(e)}
            value={this.state.location}
          ></AutoComplete>
          <Button
            type="primary"
            onClick={() => this.getWeather()}
          >Search</Button>
          <Switch
            data-testid="degree-switch"
            className="degreeSwitch"
            style={{ margin: 10 }}
            checked={this.state.degreeState}
            onClick={() => this.setState({ degreeState: !this.state.degreeState })}
            checkedChildren={`F`}
            unCheckedChildren={`C`}
          />
        </div>
        <div className="weatherDisplay">
          {this.state.currentWeather !== '' &&
            <div>
              {/* display of current weather */}
              <div>
                <h1>{weather.location.name}, {weather.location.region}</h1>
                <div onClick={() => this.setActive('current')}>
                  <WeatherCard
                    day={weather.current}
                    active={this.state.active === 'current'}
                    weatherType='current'
                    degreeState={this.state.degreeState}
                  />
                </div>
              </div>
              {/* display of 3 day forecast */}
              <div>
                {weather.forecast.forecastday.slice(1).map((day, i) => {
                  return (
                    <div key={i} onClick={() => this.setActive(i)}>
                      <WeatherCard
                        active={this.state.active === i}
                        index={i}
                        day={day}
                        weatherType='forecast'
                        degreeState={this.state.degreeState}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default App;
