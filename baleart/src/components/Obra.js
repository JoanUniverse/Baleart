import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image, Container } from "react-bootstrap";
import axios from 'axios';
import Select from './Select';

export default class Obra extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_obra: "",
            id_autor: "",
            id_exposicio: "",
            id_modalitat: "",
            titol: "",
            any_data: "",
            fotografia: "",
            descripcio_obra_ca: ""
        }
    }

    componentDidMount() {
        if (this.props.id_obra !== -1) {
            this.descarrega(this.props.id_obra);
        }
    }

    descarrega = (id_obra) => {
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
            //headers: { Authorization: 'Bearer ' + "token"}
        };
        axios.get('http://baleart.projectebaleart.com/public/api/obres/' + id_obra, config)
            .then(response => {
                console.log(response);
                this.setState({
                    id_obra: response.data.id_obra,
                    id_autor: response.data.id_autor,
                    id_exposicio: response.data.id_exposicio,
                    id_modalitat: response.data.id_modalitat,
                    titol: response.data.titol,
                    any_data: response.data.any_data,
                    fotografia: response.data.fotografia,
                    descripcio_obra_ca: response.data.descripcio_obra_ca
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
        formData.append("titol", this.state.titol);
        formData.append("any_data", this.state.any_data);
        formData.append("fotografia", this.state.fotografia);
        formData.append("descripcio_obra_ca", this.state.descripcio_obra_ca);
        formData.append("id_modalitat", this.state.id_modalitat);
        formData.append("id_exposicio", this.state.id_exposicio);
        formData.append("id_autor", this.state.id_autor);
        //Token
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
            //headers: { Authorization: 'Bearer ' + "token"}
        };
        axios.put('http://baleart.projectebaleart.com/public/api/obres/' + this.state.id_obra, formData,
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
        formData.append("titol", this.state.titol);
        formData.append("any_data", this.state.any_data);
        formData.append("fotografia", this.state.fotografia);
        formData.append("descripcio_obra_ca", this.state.descripcio_obra_ca);
        formData.append("id_modalitat", this.state.id_modalitat);
        formData.append("id_autor", this.state.id_autor);
        formData.append("id_exposicio", this.state.id_exposicio);
        //Token
        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem("token"),
                'content-type': 'application/x-www-form-urlencoded'
            }
        };
        axios.post('http://baleart.projectebaleart.com/public/api/obres', formData,
            config,
        ).then(response => {
            console.log(response);
            alert("Insertat amb èxit!");
        }
        ).catch(error => {
            console.log(error);
        });
    }


    updateFoto = () => {
        let formData = new FormData();
        formData.append("fotografia", this.state.fotografia);
        //Token
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
            //headers: { Authorization: 'Bearer ' + "token"}
        };
        axios.post('http://baleart.projectebaleart.com/public/api/obres/' + this.state.id_obra + "/imatge", formData,
            config,
        ).then(response => {
            console.log(response);
            alert("Imatge pujada amb èxit!");
        }
        ).catch(error => {
            console.log(error);
        })
    }

    updateFoto = () => {
        let formData = new FormData();
        formData.append("fotografia", this.state.fotografia);
        //Token
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
            //headers: { Authorization: 'Bearer ' + "token"}
        };
        axios.post('http://baleart.projectebaleart.com/public/api/obres/' + this.state.id_obra + "/imatge", formData,
            config,
        ).then(response => {
            console.log(response);
            alert("Imatge pujada amb èxit!");
        }
        ).catch(error => {
            console.log(error);
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeFoto = (e) => {
        this.setState({
            fotografia: e.target.files[0]
        })
    }

    onChangeObra = (v) => {
        this.setState({ id_obra: v });
    }

    onChangeExposicio = (v) => {
        this.setState({ id_exposicio: v });
    }

    onChangeModalitat = (v) => {
        this.setState({ id_modalitat: v });
    }

    onChangeAutor = (v) => {
        this.setState({ id_autor: v });
    }

    enviaFormulari = () => {
        if (this.state.id_obra === '') {
            this.inserta();
        } else {
            this.update();
        }
    }

    render() {
        return (
            <Container>
                <hr />
                <h2>{this.state.id_obra === '' ? "Insertar" : "Modificar"} una obra</h2>
                <br />
                <div className='row'>
                    <div className="col-md-1">
                        <div className="form-group">
                            <label>ID obra:</label>
                            <input type="text" className="form-control" value={this.state.id_obra} readOnly />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>Modalitat:</label>
                            <br/>
                            <Select canviar={this.onChangeModalitat}
                                valorInicial={this.state.id_modalitat}
                                clau="id_modalitat"
                                display="nom_modalitat"
                                url='http://baleart.projectebaleart.com/public/api/modalitats' />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>Exposició:</label>
                            <Select canviar={this.onChangeExposicio}
                                valorInicial={this.state.id_exposicio}
                                clau="id_exposicio"
                                display="titol_expo"
                                url='http://baleart.projectebaleart.com/public/api/exposicions' />
                        </div>
                    </div>
                </div>
                <div className="row"><div className="col-md-4">&nbsp;</div></div>
                <div className='row'>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>Autor:</label>
                            <br/>
                            <Select canviar={this.onChangeAutor}
                                valorInicial={this.state.id_autor}
                                clau="id_autor"
                                display="nom_autor"
                                url='http://baleart.projectebaleart.com/public/api/autors' />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label>Titol:</label>
                            <input type="text" className='form-control' name='titol' value={this.state.titol} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <Image src={this.state.fotografia} width="125" height="125" rounded />
                    </div>
                </div>
                <div className="row"><div className="col-md-4">&nbsp;</div></div>
                <div className='row'>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>Any:</label>
                            <input type="datetime-local" className='form-control' name='any_data' value={this.state.any_data} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>Descripció de la obra:</label>
                            <input type="text" className='form-control' name='descripcio_obra_ca' value={this.state.descripcio_obra_ca} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Fotografia:</label>
                            <input type="file" onChange={this.onChangeFoto} className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary"
                                value={"Actualitza foto"} onClick={this.updateFoto} />
                        </div>
                    </div>
                </div>
                <div className="row"><div className="col-md-4">&nbsp;</div></div>
                <div className="row">
                    <div className="col-md-5"></div>
                    <div className="col-md-5">
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary"
                                value={this.state.id_obra === '' ? "Insertar" : "Modificar"} onClick={this.enviaFormulari} />
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}