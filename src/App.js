import React from 'react';
import axios from 'axios';
import './App.css';

//COMPONENTS
import Search from './components/Search';
import Display from './components/Display';

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      value: String(null),
      tempData: {
        location: String(null),
        tempInCelsius: Number(null),
        pressure: Number(null),
        humidity: Number(null),
        wind: Number(null),
      },
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
      this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const URL = "https://api.openweathermap.org/data/2.5/weather?q="
                +this.state.value
                +"&appid=db8bbec5dab9aa4c18f73e7b272166db"

    axios.get(URL)
      .then(res => {
        const result = res.data;
        this.setState({
          tempData: {
            location: result.name,
            tempInCelsius: (Math.round((result.main.temp-273) * 10) / 10),
            pressure: result.main.pressure,
            humidity: result.main.humidity,
            wind: result.wind.speed,
          },
        })
      })

    event.preventDefault();
  }
  
  render(){
    return (
        <div className="App">
          <h1>Location: {this.state.tempData.location} </h1>
          <Display tempData={this.state.tempData}/>
          <Search 
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            value={this.state.value}
          />
        </div>
    )
  }
}

export default App;
