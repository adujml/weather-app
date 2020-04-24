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
      userInput: String(null),
      isLoading: false,
      tempData: {
        location: '',
        tempInCelsius: Number(null),
        pressure: Number(null),
        humidity: Number(null),
        wind: Number(null),
        iconURL: '',
      },
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
      this.setState({userInput: event.target.value});
  }

  handleSubmit(event) {
    const URL = "https://api.openweathermap.org/data/2.5/weather?q="
                +this.state.userInput
                +"&appid=db8bbec5dab9aa4c18f73e7b272166db"

    this.setState({
      isLoading: true,
    })

    axios.get(URL)
      .then(res => {
        const result = res.data;
        this.setState({
          isLoading: false,
          tempData: {
            location: result.name,
            tempInCelsius: (Math.round((result.main.temp-273) * 10) / 10),
            pressure: result.main.pressure,
            humidity: result.main.humidity,
            wind: result.wind.speed,
            iconURL:'http://openweathermap.org/img/wn/'+result.weather[0].icon+'.png',
          },
        })
      })
      .catch(err => {
        // handle error
        this.setState({
          isLoading: false,
        })   
        console.log("YOUR ERROR IS: " + err);
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
            defaultValue={this.state.tempData.location}
            isLoading={this.state.isLoading}
          />
        </div>
    )
  }
}

export default App;
