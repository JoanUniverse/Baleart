import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image, Container } from "react-bootstrap";
import axios from 'axios';
import Select from './Select';

export default class Usuari extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_usuari: "",
            nom_usuari: "",
            cognoms: "",
            email_usuari: "",
            telefon_usuari: "",
        }
    }

    componentDidMount() {
        console.log(this.props.id_usuari);
        if (this.props.id_usuari != -1) {
            this.descarrega(this.props.id_usuari);
        }
    }

    descarrega = (id_usuari) => {
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
            //headers: { Authorization: 'Bearer ' + "token"}
        };
        axios.get('http://baleart.projectebaleart.com/public/api/usuaris/' + id_usuari, config)
            .then(response => {
                console.log(response);
                this.setState({
                    id_usuari: response.data.id_usuari,
                    nom_usuari: response.data.nom_usuari,
                    cognoms: response.data.cognoms,
                    email_usuari: response.data.email_usuari,
                    telefon_usuari: response.data.telefon_usuari,
                    password: response.data.password,
                });
            })
            .catch(function (error) {
                //Mostrar error
                console.log(error);
            })
    }

    enviaFormulari = () => {
        if (this.state.id_usuari === '') {
            this.inserta();
        } else {
            this.update();
        }
    }

    update = () => {
        //Modificar les dades a la api
        let formData = new URLSearchParams();
        formData.append("nom_usuari", this.state.nom_usuari);
        formData.append("cognoms", this.state.cognoms);
        formData.append("email_usuari", this.state.email_usuari);
        formData.append("telefon_usuari", this.state.telefon_usuari);
        //Token
        console.log(formData);
        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem("token"),
                'content-type': 'application/x-www-form-urlencoded'
            }
            //headers: { Authorization: 'Bearer ' + "token"}
        };
        axios.put('http://baleart.projectebaleart.com/public/api/usuaris/' + this.state.id_usuari, formData,
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
        if(this.state.email_usuari === "" || this.state.password === ""){
            alert("Ni el Nom, Email i Contrassenya poden ser nulls");
            return;
        }        
        let formData = new FormData();
        formData.append("nom_usuari", this.state.nom_usuari);
        formData.append("cognoms", this.state.cognoms);
        formData.append("email_usuari", this.state.email_usuari);
        formData.append("telefon_usuari", this.state.telefon_usuari);
        formData.append("password", this.state.password);
        //Token
        console.log(formData);
        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem("token"),
                'content-type': 'application/x-www-form-urlencoded'
            }
        };
        axios.post('http://baleart.projectebaleart.com/public/api/usuaris', formData,
            config,
        ).then(response => {
            console.log(response);
            alert("Insertat amb èxit!");
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

    onChangeEspai = (v) => {
        this.setState({ id_espai: v });
    }

    render() {
        return (
            <Container>
                <hr />
                <h2>{this.state.id_usuari === '' ? "Insertar" : "Modificar"} un usuari</h2>
                <br />
                <div className='row'>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>ID usuari:</label>
                            <input type="text" className="form-control" value={this.state.id_usuari} readOnly />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label>Nom:</label>
                            <input type="text" className='form-control' name='nom_usuari' value={this.state.nom_usuari} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label>Cognoms:</label>
                            <input type="text" className='form-control' name='cognoms' value={this.state.cognoms} onChange={this.onChange} />
                        </div>
                    </div>
                </div>
                <div className="row"><div className="col-md-4">&nbsp;</div></div>
                <div className='row'>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Email:</label>
                            <input value={this.state.email_usuari} type="email" name='email_usuari' onChange={this.onChange} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label>Telèfon:</label>
                            <input value={this.state.telefon_usuari} type="text" name='telefon_usuari' onChange={this.onChange} className="form-control" />
                        </div>
                    </div>
                    {this.state.id_usuari === '' ?
                        <div className="col-md-3">
                            <div className="form-group">
                                <label>Contrassenya:</label>
                                <input value={this.state.password} type="password" name='password' onChange={this.onChange} className="form-control" />
                            </div>
                        </div> : ""}
                    <div className="row"><div className="col-md-4">&nbsp;</div></div>
                </div>
                <div className="row"><div className="col-md-4">&nbsp;</div></div>
                <div className="row">
                    <div className="col-md-5"></div>
                    <div className="col-md-5">
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary"
                                value={this.state.id_usuari === '' ? "Insertar" : "Modificar"} onClick={this.enviaFormulari} />
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}