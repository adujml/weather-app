import React from 'react';
import {Button, Spinner} from 'reactstrap';

class Display extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            showCelsius: true,
        }
    }

    render(){
        const tempData = this.props.tempData;

        return(
            <div className="Display">
                <div className="icon">
                    {
                        (!tempData.iconURL)?
                        <Spinner type="grow" color="dark"/> :
                        <img 
                            src={tempData.iconURL} 
                            alt="placeholder"  
                            height="100%"
                            width="100%"
                        />
                    }
                </div>
                <div className="temperature">
                    <h1>
                        {
                            (tempData.tempInCelsius===null)?
                            "?" :
                            (this.state.showCelsius)? 
                            tempData.tempInCelsius : 
                            Math.round(((tempData.tempInCelsius*1.8)+32) * 10) / 10
                        }
                    </h1>
                    <Button color="light" 
                    type="button" 
                    onClick={()=> this.setState({showCelsius: !this.state.showCelsius})}>
                        {(this.state.showCelsius)? 'Celcius' : 'Farenheit'}
                    </Button>
                </div>
                <div className="details">
                    <p>Pressure: {tempData.pressure} mb</p>
                    <p>Humidity: {tempData.humidity}%</p>
                    <p>Wind: {tempData.wind} km/h</p>
                </div>
            </div>
        )
    }
}

export default Display;