import React from 'react';
import {Input} from 'reactstrap';

function Search(props){
    return(
        <div className="Search">
            <form onSubmit={props.handleSubmit}>
                <Input 
                type="text"
                onChange={props.handleChange}
                placeholder="Enter Location (example: 'London')"
                />
            </form>
        </div>
    );
}

export default Search;