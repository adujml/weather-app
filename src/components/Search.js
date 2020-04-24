import React from 'react';
import {Input, Spinner} from 'reactstrap';

function Search(props){
    const form = (
                    <form onSubmit={props.handleSubmit}>
                        <Input 
                        type="text"
                        onChange={props.handleChange}
                        defaultValue={props.defaultValue}
                        placeholder="Enter Location (example: 'London')"
                        />
                    </form>
                );
    const loading = (<Spinner color="dark"/>);

    return (
        <div className="Search">
            {(props.isLoading) ? loading : form}
        </div>
    )
}

export default Search;