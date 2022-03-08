import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
export default class Autors extends Component {
    constructor(props) {
        super(props);

        const pintaBoto = (params) => {
            return <div>
                <Button color="primary" size="sm"
                    onClick={() => { window.location.assign("/autor/" + params.data.id_autor); }}>
                    Edita
                </Button>
            </div>
        }

        const botoEsborrar = (params) => {
            return <div>
                <Button variant='danger' size="sm"
                    onClick={() => {
                        if (window.confirm("Segur que vols borrar l'autor?")) {
                            this.borrar(params.data.id_autor);
                        }
                    }}>
                    Borrar
                </Button>
            </div>
        }

        this.state = {
            autors: [],
            columnes: [
                { field: "id_autor", headerName: "CODI", sortable: true, filter: true },
                { field: "nom_autor", headerName: "NOM", sortable: true, filter: true, floatingFilter: true },
                { field: "llinatges", headerName: "LLINATGES", sortable: true, filter: true, floatingFilter: true },
                { field: "nacionalitat", headerName: "NACIONALITAT", sortable: true, filter: true, },
                { field: "biografia", headerName: "BIOGRAFIA", sortable: true, filter: true, resizable: true },
                { field: 'id_autor', headerName: '', cellRendererFramework: pintaBoto, maxWidth: 100 },
                { field: 'id_autor', headerName: '', cellRendererFramework: botoEsborrar, maxWidth: 100 }
            ],
            id_autor: -1,
        }
    }

    componentDidMount() {
        this.descarrega();
    }

    descarrega = () => {
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
            //headers: { Authorization: 'Bearer ' + "token"}
        };
        axios.get('http://baleart.projectebaleart.com/public/api/autors', config)
            .then(response => {
                console.log(response);
                this.setState({ autors: response.data });
            })
            .catch(function (error) {
                console.log("ERROR -> " + error.response.data.error);
                if (error.response.status === 401) {
                    //window.location.assign("/login");
                }
            })
    }

    borrar = (id_autor) => {
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
        };
        axios.delete('http://baleart.projectebaleart.com/public/api/autors/' + id_autor, config
        ).then(response => {
            console.log(response);
            this.descarrega();
        })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
                <div className='row'>
                    <div className="row"><div className="col-md-4">&nbsp;</div></div>
                    <div className="col-md-4">
                        <Button variant='success'
                            onClick={() => { window.location.assign("/autor/-1"); }}>
                            Afegir nou autor
                        </Button>
                    </div>
                    <div className="col-md-4">
                        <h1>Llistat d'autors</h1>
                    </div>
                </div>
                <AgGridReact
                    rowData={this.state.autors}
                    columnDefs={this.state.columnes}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
            </div>
        );
    }
}