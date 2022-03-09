import React, { Component, createElement } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Image } from "react-bootstrap";
import axios from 'axios';
import Select from './Select';

export default class Explora extends Component {
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
            municipi: "",
            id_servei: "",
            imatge: "",
            exposicions: ""
        }
    }

    descarrega = (v) => {
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
        };
        axios.get('http://baleart.projectebaleart.com/public/api/espais/' + v, config)
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
                    municipi: response.data.municipi,
                    id_servei: response.data.id_servei,
                    imatge: response.data.imatge,
                    exposicions: response.data.exposicions
                });
                console.log(this.state.exposicions);
                this.carregaExposicions(this.state.exposicions);
            })
            .catch(function (error) {
                //Mostrar error
                console.log(error);
            })
    }

    onChangeEspai = (v) => {
        this.setState({ id_espai: v});
        this.descarrega(v);
    }

    carregaExposicions = (expos) =>{
        var container = document.getElementById("expos");
        expos.forEach(element => {
            var titolExpo = document.createElement("h5");
            var data = document.createElement("h6");
            data.appendChild(document.createTextNode("(" + element.data_inici + " - " + element.data_fi + ")"));
            titolExpo.appendChild(document.createTextNode(element.titol_expo));
            container.appendChild(titolExpo);
            container.appendChild(data);
            container.appendChild(document.createTextNode(element.descripcio_expo_ca));
            var obres = element.obres;
            container.appendChild(document.createElement("br"));
            container.appendChild(document.createElement("br"));
            let titolObra = document.createElement("h5");
            titolObra.appendChild(document.createTextNode("Obres: "));
            container.appendChild(titolObra);
            var table = document.createElement("table");
            obres.forEach(obra => {
                var tr = document.createElement("tr");
                var tdTitol = document.createElement("td");
                var tdFoto = document.createElement("td");

                var li = document.createElement("li");
                li.appendChild(document.createTextNode(obra.titol));
                tdTitol.appendChild(li);

                let img = document.createElement("img");
                img.setAttribute("src", obra.fotografia);
                img.setAttribute("width", 100);
                tdFoto.appendChild(img);
                tr.appendChild(tdTitol);
                tr.appendChild(tdFoto);
                container.appendChild(tr);
            });
            container.appendChild(document.createElement("br"));
            container.appendChild(document.createElement("br"));
        });
        
    }

    render() {
        return (
            <Container>
                <hr />
                <h2>Explora espais</h2>
                <br />
                <div className='row'>
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
                {this.state.id_espai === '' ? "" : 
                    <Container>
                    <hr />
                    <br />
                    <div className='row'>
                        <div className="col-md-5">
                            <h1>{this.state.nom_espai}</h1>
                        </div>
                        <div className="col-md-3">
                            <Image src={this.state.imatge} width="125" height="125" rounded />
                        </div>
                    </div>
                    <div className="row"><div className="col-md-4">&nbsp;</div></div>
                    <div className='row'>
                    <div className="col-md-5">
                        <h5>Contacte: </h5>
                        <p>{this.state.telefon}</p>
                        <p>{this.state.email}</p>
                        <p>{this.state.web}</p>
                        </div>
                    <div className="col-md-4">
                        <h5>Direcció: </h5>
                        <p>{this.state.direccio}</p>
                        <p>{this.state.municipi.nom_municipi}</p>
                        </div>
                    </div>
                    <div className="row"><div className="col-md-4">&nbsp;</div></div>
                    <div className='row'>
                        <div className="col-md-8">
                            <div className="form-group">
                                <h5>Descripció:</h5>
                                <p>{this.state.descripcio_espai_ca}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row"><div className="col-md-4">&nbsp;</div></div>
                    <div className='row'>
                        <div className="col-md-8">
                            <div id='expos' className="form-group">
                                <h4>Exposicions:</h4>
                                
                            </div>
                        </div>
                    </div>
                </Container>
                }
            </Container>
        )
    }
}