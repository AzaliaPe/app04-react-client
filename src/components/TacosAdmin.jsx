import React, {Component} from 'react';

import Container from './Container';
import PageTitle from './PageTitle';
import axios from 'axios';

export default class TacosAdmin extends Component
{
    state =
    {
        tacos: []
    }

    componentDidMount(){ //esto permite llamar funciones async
        axios.get('http://localhost:5000')
        .then(reponse => reponse.data)
        .then(tacos => {
            this.setState({tacos: tacos.map(taco =>{
                return <div key={taco.id}>
                    <h6>{taco.name}</h6>
                    <div>Cantidad: {taco.quantity}</div>
                    <div>¿Es picante?: {taco.pica}</div>
                    <br></br></div>
            })})
        });
    }

    render() 
    {
        return (
            <Container>
                <PageTitle text='El Taquito Feliz' color='#C30000' fontSize={5}/>
                <br></br>
                <h3>Menú</h3>
                {this.state.tacos}
                <h3>Agregar taco:</h3>
                <form>
                    <div className='form-group' style={{width: '50%'}}>
                        <span>Nombre del taco:</span>
                        <input className='form-control' type="text" name="" id="taco-name" placeholder='eje: tu taco'/>
                        <span>Cantidad:</span>
                        <input className='form-control' type="number" name="" id="taco-quantity" style={{width: '20%'}}/>
                        <span>¿Es picante? (Si/No):</span>
                        <div>
                            <label htmlFor="option-spyciness"></label>
                            <select id="option-spyciness" name="option-spyciness" style={{width: '20%'}}>
                                <option value="si">Si</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <br/>
                        <br/>
                        <div>
                            <button className='btn btn-secondary' id="btn-post-taco">Crear taco</button>
                        </div>
                    </div>
                </form>
            </Container>
        );
    }
}