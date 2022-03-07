import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import axios from 'axios';

export default class Autor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_autor: "",
            nom_autor: "",
            llinatges: "",
            nacionalitat: "",
            biografia: ""
        }
    }

    componentDidMount() {
        if (this.props.id_autor !== -1) {
            this.descarrega(this.props.id_autor);
        }
    }

    descarrega = (id_autor) => {
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
            //headers: { Authorization: 'Bearer ' + "token"}
        };
        axios.get('http://baleart.projectebaleart.com/public/api/autors/' + id_autor, config)
            .then(response => {
                console.log(response);
                this.setState({
                    id_autor: response.data.id_autor,
                    nom_autor: response.data.nom_autor,
                    llinatges: response.data.llinatges,
                    nacionalitat: response.data.nacionalitat,
                    biografia: response.data.biografia
                });
            })
            .catch(function (error) {
                //Mostrar error
                console.log(error);
            })
    }

    update = () => {
        //Modificar les dades a la api
        let formData = new FormData();
        formData.append("nom_autor", this.state.nom_autor);
        formData.append("llinatges", this.state.llinatges);
        formData.append("nacionalitat", this.state.nacionalitat);
        formData.append("biografia", this.state.biografia);
        //Token
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
            //headers: { Authorization: 'Bearer ' + "token"}
        };
        axios.put('http://baleart.projectebaleart.com/public/api/autors/' + this.state.id_autor, config,
            formData,
        ).then(response => {
            console.log(response);
            alert("Modificació feta amb èxit!");
        }
        ).catch(error => {
            console.log(error);
            console.log(sessionStorage.getItem("token"));
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
                <h2>Modifica un autor</h2>
                <br />
                <div className='row'>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>ID autor:</label>
                            <input type="text" className="form-control" value={this.state.id_autor} readOnly />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>Nom autor:</label>
                            <input type="text" className='form-control' name='nom_autor' value={this.state.nom_autor} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Llinatges:</label>
                            <input type="text" className='form-control' name='llinatges' value={this.state.llinatges} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>Nacionalitat:</label>
                            <input type="text" className='form-control' name='nacionalitat' value={this.state.nacionalitat} onChange={this.onChange} />
                        </div>
                    </div>
                </div>
                <div className="row"><div className="col-md-4">&nbsp;</div></div>
                <div className='row'>
                    <div className="col-md-8">
                        <div className="form-group">
                            <label>Biografia:</label>
                            <textarea value={this.state.biografia} className='form-control' name="biografia" onChange={this.onChange} />
                        </div>
                    </div>
                </div>
                <div className="row"><div className="col-md-4">&nbsp;</div></div>
                <div className="row">
                    <div className="col-md-5"></div>
                    <div className="col-md-5">
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary"
                                value={"Modifica"} onClick={this.update} />
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}