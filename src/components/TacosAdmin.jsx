import React, {Component} from 'react';

import Container from './Container';
import PageTitle from './PageTitle';
import TacoList from './TacoList';
import AddTaco from './AddTaco';
// import axios from 'axios';

export default class TacosAdmin extends Component
{
    render() 
    {
        return (
            <Container>
                <PageTitle text='El Taquito Feliz' color='#C30000' fontSize={5}/>
                <br></br>
                <h3>Menú</h3>
                <TacoList/>
                <AddTaco/>
            </Container>
        );
    }
}