import React from 'react';
import {Input, Spinner, Alert} from 'reactstrap';

function Search (props){
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

            <Alert 
            color="danger" 
            isOpen={props.error.state} 
            fade={false} 
            className="mt-3">
                Sorry, we couldn't find <b>{props.error.input}</b>
            </Alert>
        </div>
    )
}

export default Search;