import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import axios from 'axios';
import Select from './Select';

export default class Comentari extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_comentari: "",
            id_usuari: "",
            id_espai: "",
            comentari: "",
            data: ""
        }
    }

    componentDidMount() {
        if (this.props.id_comentari != -1) {
            this.descarrega(this.props.id_comentari);
        }
    }

    descarrega = (id_comentari) => {
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
            //headers: { Authorization: 'Bearer ' + "token"}
        };
        axios.get('http://baleart.projectebaleart.com/public/api/comentaris/' + id_comentari, config)
            .then(response => {
                console.log(response);
                this.setState({
                    id_comentari: response.data.id_comentari,
                    id_usuari: response.data.id_usuari,
                    id_espai: response.data.id_espai,
                    comentari: response.data.comentari,
                    data: response.data.data
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
        formData.append("id_usuari", this.state.id_usuari);
        formData.append("id_espai", this.state.id_espai);
        formData.append("comentari", this.state.comentari);
        formData.append("data", this.state.data);
        //Token
        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem("token"),
                'content-type': 'application/x-www-form-urlencoded'
            }
        };
        axios.put('http://baleart.projectebaleart.com/public/api/comentaris/' + this.state.id_comentari, formData,
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
        formData.append("id_usuari", this.state.id_usuari);
        formData.append("id_espai", this.state.id_espai);
        formData.append("comentari", this.state.comentari);
        formData.append("data", this.state.data);
        //Token
        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem("token"),
                'content-type': 'application/x-www-form-urlencoded'
            }
        };
        axios.post('http://baleart.projectebaleart.com/public/api/comentaris', formData,
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
        this.setState({ id_espai: v});
    }
    onChangeUsuari = (v) => {
        this.setState({ id_usuari: v});
    }

    enviaFormulari = () => {
        if (this.state.id_comentari === '') {
            this.inserta();
        } else {
            this.update();
        }
    }
    
    render() {
        return (
            <Container>
                <hr />
                <h2>{this.state.id_comentari === '' ? "Insertar" : "Modificar"} un comentari</h2>
                <br />
                <div className='row'>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>ID comentari:</label>
                            <input type="text" className="form-control" value={this.state.id_comentari} readOnly />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>ID usuari:</label>
                            <Select canviar={this.onChangeUsuari}
                                valorInicial={this.state.id_usuari}
                                clau="id_usuari"
                                display="nom_usuari"
                                url='http://baleart.projectebaleart.com/public/api/usuaris' />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>ID Espai:</label>
                            <Select canviar={this.onChangeEspai}
                                valorInicial={this.state.id_espai}
                                clau="id_espai"
                                display="nom_espai"
                                url='http://baleart.projectebaleart.com/public/api/espais' />
                        </div>
                    </div>
                </div>
                <div className="row"><div className="col-md-4">&nbsp;</div></div>
                <div className='row'>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Comentari:</label>
                            <input value={this.state.comentari} type="text" name='comentari' onChange={this.onChange} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Data:</label>
                            <input value={this.state.data} type="datetime-local" name='data' onChange={this.onChange} className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5"></div>
                    <div className="col-md-5">
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary"
                                value={this.state.id_comentari === '' ? "Insertar" : "Modificar"} onClick={this.enviaFormulari} />
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}