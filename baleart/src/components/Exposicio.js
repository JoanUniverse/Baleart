import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image, Container } from "react-bootstrap";
import axios from 'axios';
import Select from './Select';

export default class Exposicio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_exposicio: "",
            id_espai: "",
            titol_expo: "",
            data_inici: "",
            data_fi: "",
            descripcio_expo_ca: ""
        }
    }

    componentDidMount() {
        console.log(this.props.id_exposicio);
        if (this.props.id_exposicio != -1) {
            this.descarrega(this.props.id_exposicio);
        }
    }

    descarrega = (id_exposicio) => {
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
            //headers: { Authorization: 'Bearer ' + "token"}
        };
        axios.get('http://baleart.projectebaleart.com/public/api/exposicions/' + id_exposicio, config)
            .then(response => {
                console.log(response);
                this.setState({
                    id_exposicio: response.data.id_exposicio,
                    id_espai: response.data.id_espai,
                    titol_expo: response.data.titol_expo,
                    data_inici: response.data.data_inici,
                    data_fi: response.data.data_fi,
                    descripcio_expo_ca: response.data.descripcio_expo_ca
                });
            })
            .catch(function (error) {
                //Mostrar error
                console.log(error);
            })
    }

    enviaFormulari = () => {
        if (this.state.id_exposicio === ''){
            this.inserta();
        } else{
            this.update();
        }
    }

    update = () => {
        //Modificar les dades a la api
        let formData = new URLSearchParams();
        formData.append("id_espai", this.state.id_espai);
        formData.append("titol_expo", this.state.titol_expo);
        formData.append("data_inici", this.state.data_inici);
        formData.append("data_fi", this.state.data_fi);
        formData.append("descripcio_expo_ca", this.state.descripcio_expo_ca);
        //Token
        console.log(formData);
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token"), 
                        'content-type':'application/x-www-form-urlencoded' }
            //headers: { Authorization: 'Bearer ' + "token"}
        };
        axios.put('http://baleart.projectebaleart.com/public/api/exposicions/' + this.state.id_exposicio, formData,
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
        formData.append("id_espai", this.state.id_espai);
        formData.append("titol_expo", this.state.titol_expo);
        formData.append("data_inici", this.state.data_inici);
        formData.append("data_fi", this.state.data_fi);
        formData.append("descripcio_expo_ca", this.state.descripcio_expo_ca);
        //Token
        console.log(formData);
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token"), 
                        'content-type':'application/x-www-form-urlencoded' }
        };
        axios.post('http://baleart.projectebaleart.com/public/api/exposicions', formData,
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

    render() {
        return (
            <Container>
                <hr />
                <h2>{this.state.id_exposicio === '' ? "Insertar" : "Modificar"} una exposició</h2>
                <br />
                <div className='row'>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>ID exposició:</label>
                            <input type="text" className="form-control" value={this.state.id_exposicio} readOnly />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Títol exposició:</label>
                            <input type="text" className='form-control' name='titol_expo' value={this.state.titol_expo} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>Espai:</label>
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
                            <label>Data inici:</label>
                            <input value={this.state.data_inici} type="text" name='data_inici' onChange={this.onChange} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Data fi:</label>
                            <input value={this.state.data_fi} type="text" name='data_fi' onChange={this.onChange} className="form-control" />
                        </div>
                    </div>
                    <div className="row"><div className="col-md-4">&nbsp;</div></div>

                    <div className="col-md-8">
                        <div className="form-group">
                            <label>Descripció:</label>
                            <textarea value={this.state.descripcio_expo_ca} className='form-control' name="descripcio_expo_ca" onChange={this.onChange} />
                        </div>
                    </div>
                </div>
                <div className="row"><div className="col-md-4">&nbsp;</div></div>
                <div className="row">
                    <div className="col-md-5"></div>
                    <div className="col-md-5">
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary"
                                value={this.state.id_exposicio === '' ? "Insertar" : "Modificar"} onClick={this.enviaFormulari} />
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}