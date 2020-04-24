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
      error: {
        state: false,
        input: '',
      },
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
      error: {
        state: false,
      },
    })

    axios.get(URL)
      .then(res => {
        const data = res.data;
        this.setState({
          isLoading: false,
          tempData: {
            location: data.name,
            tempInCelsius: (Math.round((data.main.temp-273) * 10) / 10),
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            wind: data.wind.speed,
            iconURL:'http://openweathermap.org/img/wn/'+data.weather[0].icon+'.png',
          },
        })
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          error: {
            state: true,
            input: this.state.userInput,
          },
        })   
      })

    event.preventDefault();
  }
  
  render(){
    return (
        <div className="App">
          <Display tempData={this.state.tempData}/>
          <Search 
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            defaultValue={this.state.tempData.location}
            isLoading={this.state.isLoading}
            error={this.state.error}
            userInput={this.state.userInput}
          />
        </div>
    )
  }
}

export default App;
