import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import axios from 'axios';

export default class PerfilUsuari extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_usuari: "",
            nom_usuari: "",
            cognoms: "",
            email_usuari: "",
            telefon_usuari: "",
            password: ""
        }
    }

    componentDidMount() {
        if (this.props.id_usuari != -1) {
            this.descarrega(this.props.id_usuari);
        }
    }

    descarrega = () => {
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
        };
        const usuari = sessionStorage.getItem("id_usuari");
        axios.get('http://baleart.projectebaleart.com/public/api/usuaris/' + usuari, config)
            .then(response => {
                //console.log(response);
                this.setState({
                    id_usuari: response.data.id_usuari,
                    nom_usuari: response.data.nom_usuari,
                    cognoms: response.data.cognoms,
                    email_usuari: response.data.email_usuari,
                    telefon_usuari: response.data.telefon_usuari,
                    password: response.data.password
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
        formData.append("nom_usuari", this.state.nom_usuari);
        formData.append("cognoms", this.state.cognoms);
        formData.append("email_usuari", this.state.email_usuari);
        formData.append("telefon_usuari", this.state.telefon_usuari);
        //formData.append("password", this.state.password);
        //Token
        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem("token"),
                'content-type': 'application/x-www-form-urlencoded'
            }
        };
        const usuari = sessionStorage.getItem("id_usuari");
        axios.put('http://baleart.projectebaleart.com/public/api/usuaris/' + usuari, formData,
            config,
        ).then(response => {
            console.log(response);
            alert("Modificació feta amb èxit!");
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

    render() {
        return (
            <Container>
                <hr />
                <h2>Modifica el teu perfil</h2>
                <br />
                <div className='row'>
                    <div className="col-md-1">
                        <div className="form-group">
                            <label>ID:</label>
                            <input type="text" className="form-control" value={this.state.id_usuari} readOnly />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>Nom usuari:</label>
                            <input type="text" className='form-control' name='nom_usuari' value={this.state.nom_usuari} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label>Cognoms:</label>
                            <input type="text" className='form-control' name='cognoms' value={this.state.cognoms} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="text" className='form-control' name='email_usuari' value={this.state.email_usuari} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>Telèfon:</label>
                            <input type="text" className='form-control' name='telefon_usuari' value={this.state.telefon_usuari} onChange={this.onChange} />
                        </div>
                    </div>
                </div>
                <div className="row"><div className="col-md-4">&nbsp;</div></div>
                {/* <div className='row'>
                    <div className="col-md-5">
                        <div className="form-group">
                            <h4>Restableix la teva contrasenya</h4>
                            <label>Password:</label>
                            <input type="password" className='form-control' name='password' value={this.state.password} onChange={this.onChange} />
                        </div>
                    </div>
                </div>
                <div className="row"><div className="col-md-4">&nbsp;</div></div> */}
                <div className="row">
                    <div className="col-md-1">
                        <div className="form-group">
                            <input type="submit" value="Modifica" className="btn btn-primary" onClick={this.update} />
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}