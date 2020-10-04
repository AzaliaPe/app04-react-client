import React, {Component, Fragment} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

export default class TacoList extends Component{

    state = {
        tacos: [],
        currentTaco: {},
    }

    selectedValue = 'active'

    handleClose = () => {
        this.setState({showModal: false});
        console.log(this.state.showModal);
    }
    
    handleShow = () => {
        this.setState({showModal: true});
        console.log(this.state.showModal);
    }

    deleteTaco = id =>{
        this.handleClose();
        axios.delete(`http://localhost:5000/${id}`)
        .then(data => window.location.reload());
    }

    tacoClick = id =>{
        console.log(id);
        axios.get(`http://localhost:5000/${id}`)
        .then(reponse => reponse.data)
        .then(taco => this.setState({currentTaco: taco}));
    }

    editTaco = id =>{
        console.log(id);
        axios.get(`http://localhost:5000/${id}`)
        .then(reponse => reponse.data)
        .then(taco => this.props.history.push({pathname: '/edittaco', state: {tacoId: taco.id}}));
    }

    componentDidMount(){
        this.watchCode();
    }

    // onSelect = event => event.target.className = `list-group-item ${this.selectedValue}`;
    // onDeselect = event => event.target.className = 'list-group-item';

    watchCode = ()=> setTimeout(()=>{
        axios.get('http://localhost:5000')
        .then(reponse => reponse.data)
        .then(tacos => {
            this.setState({tacos: tacos.map(taco =>{
                // return <li className={`list-group-item`} key={taco.id} onClick={()=>this.tacoClick(taco.id)}
                // onMouseOver={this.onSelect} onMouseOut={this.onDeselect}>
                return <li className='list-group-item' key={taco.id} onClick={()=>this.tacoClick(taco.id)}>
                        <b>Nombre del taco: </b>{taco.name} <br/>
                        <b>Cantidad: </b>{taco.quantity} <br/>
                        <b>¿Es picante?: </b>{taco.pica} <br/>
                        <br/>
                        <button onClick={this.handleShow} className='btn btn-danger' id="btn-delete-taco">Eliminar</button><span/> 
                        <span/> <span/><button onClick={()=>this.editTaco(taco.id)} className='btn btn-primary active' id="btn-edit-taco">Editar</button><span/> 
                        </li>
            })})
        });
        this.watchCode();
    }, 1000);

    render() {
        // const {id, name, quantity, pica, showModal} = this.state.currentTaco;
        const {id} = this.state.currentTaco;
        return (
            <Fragment>
                {/* <div className="card" style={{width: '18rem'}}>
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">La orden viene con {quantity} tacos y {pica} pica.</p>
                    </div>
                </div> */}
                {/* <ul style={{
                    cursor: 'pointer'
                }} className='list-group'> */}
                    {this.state.tacos}
                {/* </ul> */}
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Eliminar</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                        <p>¿Estas seguro que quieres eliminar este taco?</p>
                        </Modal.Body>

                        <Modal.Footer>
                            <button className='btn btn-danger' onClick={this.handleClose}>Cancelar</button>
                            <button className='btn btn-success' onClick={()=>this.deleteTaco(id)}>Confirmar</button>
                        </Modal.Footer>
                    </Modal>
                
            </Fragment>
        );
    }
}