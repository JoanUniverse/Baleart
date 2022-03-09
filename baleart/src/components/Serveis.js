import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
export default class Serveis extends Component {
    constructor(props) {
        super(props);

        const pintaBoto = (params) => {
            return <div>
                <Button color="primary" size="sm"
                    onClick={() => { window.location.assign("/serveis/" + params.data.nom_servei); }}>
                    Edita
                </Button>
            </div>
        }

        const botoEsborrar = (params) => {
            return <div>
                <Button variant='danger' size="sm"
                    onClick={() => {
                        if (window.confirm("Segur que vols borrar el servei?")) {
                            this.borrar(params.data.id_usuari);
                        }
                    }}>
                    Borrar
                </Button>
            </div>
        }

        this.state = {
            autors: [],
            columnes: [
                { field: "nom_servei", headerName: "NOM SERVEI", sortable: true, filter: true },
                { field: "descripcio_servei_ca", headerName: "DESCRIPCIO", sortable: true, filter: true, floatingFilter: true },
                { field: 'nom_servei', headerName: '', cellRendererFramework: pintaBoto, maxWidth: 100 },
                { field: 'nom_servei', headerName: '', cellRendererFramework: botoEsborrar, maxWidth: 100 }
            ],
            id_usuari: -1,
        }
    }
    componentDidMount() {
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
            //headers: { Authorization: 'Bearer ' + "token"}
        };
        axios.get('http://baleart.projectebaleart.com/public/api/serveis', config)
            .then(response => {
                console.log(response);
                this.setState({ serveis: response.data });
            })
            .catch(function (error) {
                console.log("ERROR -> " + error.response.data.error);
                if (error.response.status === 401) {
                    //window.location.assign("/login");
                }
            })
    }
    descarrega = (id_usuari) => {
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
            //headers: { Authorization: 'Bearer ' + "token"}
        };
        axios.get('http://baleart.projectebaleart.com/public/api/comentaris/' + id_usuari, config)
            .then(response => {
                console.log(response);
                this.setState({
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
        axios.put('http://baleart.projectebaleart.com/public/api/serveis/' + this.state.id_usuari, formData,
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
        formData.append("nom_servei", this.state.nom_servei);
        formData.append("descripcio_servei_ca", this.state.descripcio_servei_ca);
        //Token
        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem("token"),
                'content-type': 'application/x-www-form-urlencoded'
            }
        };
        axios.post('http://baleart.projectebaleart.com/public/api/serveis', formData,
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

    enviaFormulari = () => {
        if (this.state.id_usuari === '') {
            this.inserta();
        } else {
            this.update();
        }
    }

    render() {
        return (
            <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
                <AgGridReact
                    rowData={this.state.serveis}
                    columnDefs={this.state.columnes}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
            </div>
        );
    }
}