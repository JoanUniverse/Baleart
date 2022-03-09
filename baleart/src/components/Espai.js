import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image, Container } from "react-bootstrap";
import axios from 'axios';
import Select from './Select';

export default class Espai extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_espai: "",
            nom_espai: "",
            direccio: "",
            email: "",
            telefon: "",
            web: "",
            descripcio_espai_ca: "",
            imatge: "",
            id_usuari: "",
            id_tipus: "",
            id_municipi: "",
            id_servei: "",
            imatge: ""
        }
    }

    componentDidMount() {
        if (this.props.id_espai !== -1) {
            this.descarrega(this.props.id_espai);
        }
    }

    descarrega = (id_espai) => {
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
        };
        axios.get('http://baleart.projectebaleart.com/public/api/espais/' + id_espai, config)
            .then(response => {
                //console.log(response);
                this.setState({
                    id_espai: response.data.id_espai,
                    nom_espai: response.data.nom_espai,
                    direccio: response.data.direccio,
                    email: response.data.email,
                    telefon: response.data.telefon,
                    web: response.data.web,
                    descripcio_espai_ca: response.data.descripcio_espai_ca,
                    imatge: response.data.imatge,
                    id_usuari: response.data.id_usuari,
                    id_tipus: response.data.id_tipus,
                    id_municipi: response.data.id_municipi,
                    id_servei: response.data.id_servei,
                    imatge: response.data.imatge
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
        formData.append("nom_espai", this.state.nom_espai);
        formData.append("direccio", this.state.direccio);
        formData.append("email", this.state.email);
        formData.append("telefon", this.state.telefon);
        formData.append("web", this.state.web);
        formData.append("descripcio_espai_ca", this.state.descripcio_espai_ca);
        formData.append("id_usuari", this.state.id_usuari);
        formData.append("id_tipus", this.state.id_tipus);
        formData.append("id_municipi", this.state.id_municipi);
        formData.append("id_servei", this.state.id_servei);
        //Token
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
        };
        axios.put('http://baleart.projectebaleart.com/public/api/espais/' + this.state.id_espai, formData,
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
        let formData = new FormData();
        formData.append("nom_espai", this.state.nom_espai);
        formData.append("direccio", this.state.direccio);
        formData.append("email", this.state.email);
        formData.append("telefon", this.state.telefon);
        formData.append("web", this.state.web);
        formData.append("descripcio_espai_ca", this.state.descripcio_espai_ca);
        formData.append("id_usuari", this.state.id_usuari);
        formData.append("id_tipus", this.state.id_tipus);
        formData.append("id_municipi", this.state.id_municipi);
        formData.append("id_servei", this.state.id_servei);
        formData.append("imatge", this.state.imatge);
        //Token
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
        };
        axios.post('http://baleart.projectebaleart.com/public/api/espais', formData,
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
        formData.append("imatge", this.state.imatge);
        //Token
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
            //headers: { Authorization: 'Bearer ' + "token"}
        };
        axios.post('http://baleart.projectebaleart.com/public/api/espais/' + this.state.id_espai + "/imatge", formData,
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
            imatge: e.target.files[0]
        })
    }

    onChangeUsuari = (v) => {
        this.setState({ id_usuari: v });
    }

    onChangeTipus = (v) => {
        this.setState({ id_tipus: v });
    }

    onChangeMunicipi = (v) => {
        this.setState({ id_municipi: v });
    }

    onChangeServei = (v) => {
        this.setState({ id_servei: v });
    }

    enviaFormulari = () => {
        if (this.state.id_usuari === "") {
            return alert("Tria un usuari!");
        }

        if (this.state.id_tipus === "") {
            return alert("Tria un tipus!");
        }

        if (this.state.id_municipi === "") {
            return alert("Tria un municipi!");
        }

        if (this.state.id_servei === "") {
            return alert("Tria un servei!");
        }

        if (this.state.id_espai === '') {
            this.inserta();
        } else {
            this.update();
        }
    }

    render() {
        return (
            <Container>
                <hr />
                <h2>{this.state.id_espai === '' ? "Insertar" : "Modificar"} un espai</h2>
                <br />
                <div className='row'>
                    <div className="col-md-1">
                        <div className="form-group">
                            <label>ID espai:</label>
                            <input type="text" className="form-control" value={this.state.id_espai} readOnly />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>Nom espai:</label>
                            <input type="text" className='form-control' name='nom_espai' value={this.state.nom_espai} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label>Direcció:</label>
                            <input type="text" className='form-control' name='direccio' value={this.state.direccio} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="text" className='form-control' name='email' value={this.state.email} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <Image src={this.state.imatge} width="125" height="125" rounded />
                    </div>
                </div>
                <div className="row"><div className="col-md-4">&nbsp;</div></div>
                <div className='row'>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>Telèfon:</label>
                            <input type="text" className='form-control' name='telefon' value={this.state.telefon} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Web:</label>
                            <input type="text" className='form-control' name='web' value={this.state.web} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Foto:</label>
                            <input type="file" onChange={this.onChangeFoto} className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="row"><div className="col-md-4">&nbsp;</div></div>
                <div className="row">
                    <div className="col-md-6"></div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary"
                                value={"Actualitza foto"} onClick={this.updateFoto} />
                        </div>
                    </div>
                </div>
                <div className="row"><div className="col-md-4">&nbsp;</div></div>
                <div className='row'>
                    <div className="col-md-8">
                        <div className="form-group">
                            <label>Descripció:</label>
                            <textarea value={this.state.descripcio_espai_ca} className='form-control' name="descripcio_espai_ca" onChange={this.onChange} />
                        </div>
                    </div>
                </div>
                <div className="row"><div className="col-md-4">&nbsp;</div></div>
                <div className="row"><div className="col-md-4">&nbsp;</div></div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <label>Usuari: </label>
                            <Select canviar={this.onChangeUsuari}
                                valorInicial={this.state.id_usuari}
                                clau="id_usuari"
                                display="nom_usuari"
                                url='http://baleart.projectebaleart.com/public/api/usuaris' />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label>Tipus: </label>
                            <Select canviar={this.onChangeTipus}
                                valorInicial={this.state.id_tipus}
                                clau="id_tipus"
                                display="descripcio_tipus_ca"
                                url='http://baleart.projectebaleart.com/public/api/tipus' />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label>Municipi: </label>
                            <Select canviar={this.onChangeMunicipi}
                                valorInicial={this.state.id_municipi}
                                clau="id_municipi"
                                display="nom_municipi"
                                url='http://baleart.projectebaleart.com/public/api/municipis' />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label>Servei: </label>
                            <Select canviar={this.onChangeServei}
                                valorInicial={this.state.id_servei}
                                clau="id_servei"
                                display="nom_servei"
                                url='http://baleart.projectebaleart.com/public/api/serveis' />
                        </div>
                    </div>
                </div>
                <div className="row"><div className="col-md-4">&nbsp;</div></div>
                <div className="row">
                    <div className="col-md-5"></div>
                    <div className="col-md-5">
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary"
                                value={this.state.id_espai === '' ? "Insertar" : "Modificar"} onClick={this.enviaFormulari} />
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}