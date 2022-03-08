import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import axios from 'axios';

export default class Modalitat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_modalitat: "",
            descripcio_modalitat_ca: ""
        }
    }

    componentDidMount() {
        if (this.props.id_modalitat != -1) {
            this.descarrega(this.props.id_modalitat);
        }
    }

    descarrega = (id_modalitat) => {
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
            //headers: { Authorization: 'Bearer ' + "token"}
        };
        axios.get('http://baleart.projectebaleart.com/public/api/modalitats/' + id_modalitat, config)
            .then(response => {
                console.log(response);
                this.setState({
                    id_modalitat: response.data.id_modalitat,
                    descripcio_modalitat_ca: response.data.descripcio_modalitat_ca
                });
            })
            .catch(function (error) {
                //Mostrar error
                console.log(error);
            })
    }

    update = () => {
        //Modificar les dades a la api
        let formData = new URLSearchParams();
        formData.append("nom_autor", this.state.nom_autor);
        formData.append("descripcio_modalitat_ca", this.state.descripcio_modalitat_ca);
        //Token
        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem("token"),
                'content-type': 'application/x-www-form-urlencoded'
            }
        };
        axios.put('http://baleart.projectebaleart.com/public/api/modalitats/' + this.state.id_modalitat, formData,
            config,
        ).then(response => {
            console.log(response);
            alert("Modificació feta amb èxit!");
        }
        ).catch(error => {
            console.log(error);
        });
    }

    inserta = () => {
        //Modificar les dades a la api
        let formData = new FormData();
        formData.append("descripcio_modalitat_ca", this.state.descripcio_modalitat_ca);
        //Token
        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem("token"),
                'content-type': 'application/x-www-form-urlencoded'
            }
        };
        axios.post('http://baleart.projectebaleart.com/public/api/modalitats', formData,
            config,
        ).then(response => {
            console.log(response);
            alert("Modalitat insertada amb èxit!");
        }
        ).catch(error => {
            console.log(error);
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    enviaFormulari = () => {
        if (this.state.id_modalitat === '') {
            this.inserta();
        } else {
            this.update();
        }
    }

    render() {
        return (
            <Container>
                <hr />
                <h2>{this.state.id_modalitat === '' ? "Insertar" : "Modifica"} una modalitat</h2>
                <br />
                <div className='row'>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>ID modalitat:</label>
                            <input type="text" className="form-control" value={this.state.id_modalitat} readOnly />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>Descripció:</label>
                            <input type="text" className='form-control' name='descripcio_modalitat_ca' value={this.state.descripcio_modalitat_ca} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="row"><div className="col-md-4">&nbsp;</div></div>
                    <div className="row">
                        <div className="col-md-5"></div>
                        <div className="col-md-5">
                            <div className="form-group">
                                <input type="submit" className="btn btn-primary"
                                    value={this.state.id_modalitat === '' ? "Insertar" : "Modifica"} onClick={this.enviaFormulari} />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}