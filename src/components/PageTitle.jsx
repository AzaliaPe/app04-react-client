import React, {Component, Fragment} from 'react';

export default class PageTitle extends Component
{

    componentDidUpdate()
    {
        
    }

    render() 
    {
        return (
            <Fragment>
                <input type="number" name="" id="" value='5'/>

                <h1 style={{
                    color: this.props.color,
                    fontSize: '24em'
                }}>{this.props.text}</h1>
            </Fragment>
        );
    }
}