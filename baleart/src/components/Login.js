import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    login = () => {
        let formData = new FormData();
        formData.append("email_usuari", this.state.email);
        formData.append("password", this.state.password);
        axios.post("http://baleart.projectebaleart.com/public/api/login", formData,
        ).then(resposta => {
            console.log(resposta);
            sessionStorage.setItem("token", resposta.data.result);
            sessionStorage.setItem("id_usuari", resposta.data.id_usuari);
            console.log(sessionStorage.getItem("token"));
            console.log(sessionStorage.getItem("id_usuari"));
            this.descarrega();
        }
        ).catch(error => {
            console.log(error);
            sessionStorage.setItem("token", "");
            sessionStorage.setItem("id_usuari", "");
            sessionStorage.setItem("admin", "");
        })
    }

    descarrega = () => {
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
        };
        const usuari = sessionStorage.getItem("id_usuari");
        axios.get('http://baleart.projectebaleart.com/public/api/usuaris/' + usuari, config)
            .then(response => {
                sessionStorage.setItem("admin", response.data.administrador);
                window.location.assign("/");
            })
            .catch(function (error) {
                //Mostrar error
                console.log(error);
            })
    }

    canviParam = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div id="divLogin">
                <div id="dadesLogin">
                    <h1>Baleart</h1>
                    <p><label>Email</label></p>
                    <p><input type="text" id="emailLogin" name="email" onChange={this.canviParam} /></p>
                    <p><label>Password</label></p>
                    <p><input type="password" id="passwordLogin" name="password" onChange={this.canviParam} /></p>
                    <p><button type="button" className="btn btn-primary" onClick={this.login}>Login</button></p>
                </div>
            </div>
        )
    }
}