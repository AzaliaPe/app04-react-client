import React, {Component} from 'react'; //Las llaves son para no poner .component
import PageTitle from './components/PageTitle';

export default class App extends Component
{
  render()
  {
    return(
      <PageTitle text='El Taquito Feliz' color='pink'/>
    );
  }
}

