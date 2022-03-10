import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
export default class Modalitats extends Component {
    constructor(props) {
        super(props);

        const pintaBoto = (params) => {
            return <div>
                <Button color="primary" size="sm"
                    onClick={() => { window.location.assign("/tipus/" + params.data.nom_tipus); }}>
                    Edita
                </Button>
            </div>
        }

        const botoEsborrar = (params) => {
            return <div>
                <Button variant='danger' size="sm"
                    onClick={() => {
                        if (window.confirm("Segur que vols borrar el tipus?")) {
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
                { field: "nom_tipus", headerName: "NOM SERVEI", sortable: true, filter: true },
                { field: "descripcio_tipus_ca", headerName: "DESCRIPCIO", sortable: true, filter: true, floatingFilter: true },
                { field: 'nom_tipus', headerName: '', cellRendererFramework: pintaBoto, maxWidth: 100 },
                { field: 'nom_tipus', headerName: '', cellRendererFramework: botoEsborrar, maxWidth: 100 }
            ],
            id_usuari: -1,
        }
    }
    
    componentDidMount() {
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
            //headers: { Authorization: 'Bearer ' + "token"}
        };
        axios.get('http://baleart.projectebaleart.com/public/api/tipus', config)
            .then(response => {
                console.log(response);
                this.setState({ espais: response.data });
            })
            .catch(function (error) {
                console.log("ERROR -> " + error.response.data.error);
                if (error.response.status === 401) {
                    //window.location.assign("/login");
                }
            })
    }

    render() {
        return (
            <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
                <AgGridReact
                    rowData={this.state.espais}
                    columnDefs={this.state.columnes}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
            </div>
        );
    }
}