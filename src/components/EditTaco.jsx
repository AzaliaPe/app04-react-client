import React, {Component, Fragment} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';


export default class EditTaco extends Component{

    state = {
        taco: {},
        name: '',
        quantity: 0,
        pica: 'si',
        //nameField: this.nameFieldStart()
        showModal: false
    }

    catchName = event => this.setState({name: event.target.value});
    catchQuantity = event => this.setState({quantity: event.target.value});
    catchSpacyness = event => this.setState({pica: event.target.value});

    componentDidMount(){
        const tacoId = this.props.history.location.state.tacoId;
        axios.get(`http://localhost:5000/${tacoId}`)
        .then(reponse => reponse.data)
        .then(taco => {
            this.setState({taco: taco})
            console.log(this.state.taco)
        });
    }

    saveChanges = () => {
        this.handleClose();
        const {taco, name, quantity, pica} = this.state;
        axios.put(`http://localhost:5000/${taco.id}`, {
            name: name,
            quantity: quantity,
            pica: pica
        });
        this.props.history.push('/');
    }

    handleClose = () => {
        this.setState({showModal: false});
        console.log(this.state.showModal);
    }
    
    handleShow = () => {
        this.setState({showModal: true});
        console.log(this.state.showModal);
    }

    cancel = () => {
        this.props.history.push('/');
    }

    handleShowValidate = () => {
        this.setState({showModalValidate: true});
    }
    handleCloseValidate = () => {
        this.setState({showModalValidate: false});
    }
    
    validateField = () => {
        if(this.state.name === '' || this.state.quantity <= 0)
        {
            this.handleShowValidate();
        }
        else
        {
            this.handleShow();
        }
    }

    // nameFieldStart = ()=>{
    //     return <div className="input-group mb-3">
    //             <div className="input-group-prepend">
    //                 <span className="input-group-text" id="inputGroup-sizing-default">Nombre</span>
    //             </div>
    //             <input onClick={this.editName} onChange={this.catchName} className='form-control' 
    //             type="text" name="" id="taco-name" placeholder='eje: tu taco'
    //             aria-label="Default" aria-describedby="inputGroup-sizing-default" value={this.state.name}/>
    //         </div>; 
    // } 
    
    // nameFieldEdit = ()=> <div className="input-group mb-3">
    //                     <div className="input-group-prepend">
    //                         <span className="input-group-text" id="inputGroup-sizing-default">Nombre</span>
    //                     </div>
    //                     <input onClick={this.editName} onChange={this.catchName} className='form-control' 
    //                     type="text" name="" id="taco-name" placeholder='eje: tu taco'
    //                     aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
    //                 </div>; 

    // editName = ()=>{
    //     this.setState({nameField: this.nameFieldEdit});
    //     console.log('click');
    // }

    render() {
        const {name, quantity, pica} = this.state.taco;
        return (
             <Fragment>
                <h3>Editar taco:</h3>
                    <br/>
                    <div className='form-group' style={{width: '50%'}}>
                    <label>{`Valor actual: ${name}`}</label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Nombre</span>
                            </div>
                            <input onClick={this.editName} onChange={this.catchName} className='form-control' 
                            type="text" name="" id="taco-name" placeholder='Eje: Tu taco'
                            aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
                        </div>

                        <label>{`Valor actual: ${quantity}`}</label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Cantidad</span>
                            </div>
                            <input onChange={this.catchQuantity} className='form-control' 
                            type="number" name="" id="taco-quantity" placeholder='Ingresa un número'
                            aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                        </div>

                        <label>{`Valor actual: ${pica}`}</label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">¿Es picante? (Si/No):</span>
                            </div>
                            <label htmlFor="option-spyciness"></label>
                            <select className='custom-select' onChange={this.catchSpacyness} id="option-spyciness" name="option-spyciness" style={{width: '20%'}}>
                                <option value="si">Si</option>
                                <option value="no">No</option>
                            </select>
                        </div>

                        <br/>
                        <br/>
                        <div>
                            <button onClick={this.validateField} className='btn btn-success' id="btn-post-taco">Guardar</button><span/> <span/>
                            <span/><span/><button onClick={this.cancel} className='btn btn-danger' id="btn-cancel">Cancelar</button><span/>
                        </div>
                    </div>
                    <Modal show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirmar cambios</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                        <p>¿Estas seguro que quieres guardar estos cambios?</p>

                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Valor Anterior</th>
                                    <th scope="col">Valor Nuevo</th>
                                </tr>
                            </thead>
                        <tbody>
                                <tr>
                                    <th scope="row">Nombre:</th>
                                    <td>{name}</td>
                                    <td>{this.state.name}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Cantidad:</th>
                                    <td>{quantity}</td>
                                    <td>{this.state.quantity}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Picante:</th>
                                    <td>{pica}</td>
                                    <td>{this.state.pica}</td>
                                </tr>
                        </tbody>
                        </table>
                        
                        {/* <div className="row">
                            <div className="col-md-6">
                                <h5>Valores Nuevos: </h5>
                                <h6>Nombre Taco:</h6>
                                <div>{this.state.name}</div>
                                <h6>Cantidad Taco:</h6>
                                <div>{this.state.quantity}</div>
                                <h6>Es picante:</h6>
                                <div>{this.state.pica}</div>
                            </div>
                            <div className="col-md-5">
                            <div> 
                                <h5>Valores Anteriores: </h5>
                                <h6>Nombre Taco:</h6>
                                <div>{name}</div>
                                <h6>Cantidad Taco:</h6>
                                <div>{quantity}</div>
                                <h6>Es picante:</h6>
                                <div>{pica}</div>
                            </div>  
                            </div>
                        </div> */}
                            
                        </Modal.Body>

                        <Modal.Footer>
                            <button  className='btn btn-danger' onClick={this.handleClose}>Cancelar</button>
                            <button  className='btn btn-success' onClick={this.saveChanges}>Confirmar</button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.showModalValidate} onHide={this.handleCloseValidate}>
                        <Modal.Header closeButton>
                            <Modal.Title>Error!</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                        <p>Favor de llenar todos los campos.</p>
                        </Modal.Body>

                        <Modal.Footer>
                            <button  className='btn btn-success' onClick={this.handleCloseValidate}>Confirmar</button>
                        </Modal.Footer>
                    </Modal>
            </Fragment>
        );
    }
}
             
        