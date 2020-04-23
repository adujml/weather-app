import React from 'react';
import {Button} from 'reactstrap';

class Display extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            showCelsius: true,
        }
    }

    render(){
        const temp = this.props.tempData.tempInCelsius;

        return(
            <div className="Display">
                <div className="icon">
                    <img 
                        src="assets/img/partly_cloudy.png" 
                        alt="placeholder"  
                        height="100%" 
                        width="100%"
                    />
                </div>
                <div className="temperature">
                    <h1>
                        {
                            (temp===null)?
                            "?" :
                            (this.state.showCelsius)? temp : Math.round(((temp*1.8)+32) * 10) / 10
                        }
                    </h1>
                    <Button color="light" 
                    type="button" 
                    onClick={()=> this.setState({showCelsius: !this.state.showCelsius})}>
                        {(this.state.showCelsius)? 'Celcius' : 'Farenheit'}
                    </Button>
                </div>
                <div className="details">
                    <p>Pressure: {this.props.tempData.pressure}</p>
                    <p>Humidity: {this.props.tempData.humidity}</p>
                    <p>Wind: {this.props.tempData.wind}</p>
                </div>
            </div>
        )
    }
}

export default Display;