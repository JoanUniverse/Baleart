import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

export default class Registre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nom_usuari: "",
            cognoms: "",
            telefon: "",
            email: "",
            password: ""
        }
    }

    componentDidMount() {

    }

    registre = () => {
        let formData = new FormData();
        formData.append("nom_usuari", this.state.nom_usuari);
        formData.append("cognoms", this.state.cognoms);
        formData.append("email_usuari", this.state.email);
        formData.append("telefon_usuari", this.state.telefon);
        formData.append("password", this.state.password);
        axios.post("http://baleart.projectebaleart.com/public/api/usuaris", formData,
        ).then(resposta => {
            console.log(resposta);
        }
        ).catch(error => {
            console.log(error);
        })
    }

    canviParam = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div id="divregistre">
                <div id="dadesregistre">
                    <h1>Registre a Baleart</h1>
                    <p><label>Nom: </label></p>
                    <p><input type="text" name="nom_usuari" onChange={this.canviParam} /></p>
                    <p><label>Cognoms: </label></p>
                    <p><input type="text" name="cognoms" onChange={this.canviParam} /></p>
                    <p><label>Telèfon: </label></p>
                    <p><input type="text" name="telefon" onChange={this.canviParam} /></p>
                    <p><label>Email: </label></p>
                    <p><input type="text" name="email" onChange={this.canviParam} /></p>
                    <p><label>Password: </label></p>
                    <p><input type="password" name="password" onChange={this.canviParam} /></p>
                    <p><button type="button" className="btn btn-primary" onClick={this.registre}>Crea</button></p>
                </div>
            </div>
        )
    }
}