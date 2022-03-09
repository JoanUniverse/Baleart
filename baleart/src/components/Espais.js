import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, ListGroup } from "react-bootstrap";
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
export default class Espais extends Component {
    constructor(props) {
        super(props);

        const pintaBoto = (params) => {
            return <div>
                <Button color="primary" size="sm"
                    onClick={() => { window.location.assign("/espai/" + params.data.id_espai) }}>
                    Edita
                </Button>
            </div>
        }

        const pintaBotoBorrar = (params) => {
            return <div>
                <Button variant="danger" size="sm"
                    onClick={() => {
                        if (window.confirm("Segur vols borrar l'espai?")) {
                            this.borrar(params.data.id_espai);
                        }
                    }}>
                    Borrar
                </Button>
            </div>
        }

        const pintaFoto = (params) => {
            return <div>
                <img src={params.data.imatge} alt='' width='70' />
            </div>
        }

        this.state = {
            espais: [],
            columnes: [
                { field: "id_espai", headerName: "ID ESPAI", sortable: true, filter: true },
                { field: "nom_espai", headerName: "NOM", sortable: true, filter: true, floatingFilter: true },
                { field: "direccio", headerName: "DIRECCIÓ", sortable: true, filter: true, floatingFilter: true },
                { field: "email", headerName: "EMAIL", sortable: true, filter: true, floatingFilter: true },
                { field: "telefon", headerName: "TELÈFON", sortable: true, filter: true },
                { field: "web", headerName: "WEB", sortable: true, filter: true },
                { field: "descripcio_espai_ca", headerName: "DESCRIPCIÓ", sortable: true, filter: true, resizable: true },
                { field: "imatge", headerName: "IMATGE", cellRendererFramework: pintaFoto, maxWidth: 150 },
                { field: "id_usuari", headerName: "CODI USUARI", sortable: true, filter: true, floatingFilter: true },
                { field: "id_tipus", headerName: "CODI TIPUS", sortable: true, filter: true, floatingFilter: true },
                { field: "id_municipi", headerName: "CODI MUNICIPI", sortable: true, filter: true, floatingFilter: true },
                { field: "id_servei", headerName: "CODI SERVEI", sortable: true, filter: true, floatingFilter: true },
                { field: 'id_espai', headerName: '', cellRendererFramework: pintaBoto, maxWidth: 100 },
                { field: 'id_espai', headerName: '', cellRendererFramework: pintaBotoBorrar, maxWidth: 100 }
            ],
            id_espai: -1,
        }
    }

    borrar = (id) => {
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
        };
        axios.delete('http://baleart.projectebaleart.com/public/api/espais/' + id, config)
            .then(response => {
                console.log(response);
                this.descarrega();
            })
            .catch(function (error) {
                //Mostrar error
                console.log(error);
            })
    }

    componentDidMount() {
        this.descarrega();
    }

    descarrega = () => {
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
        };
        axios.get('http://baleart.projectebaleart.com/public/api/espais', config)
            .then(response => {
                console.log(response);
                this.setState({ espais: response.data });
            })
            .catch(function (error) {
                console.log("ERROR -> " + error.response.data.error);
                if (error.response.status == 401) {
                    //window.location.assign("/login");
                }
            })
    }

    render() {
        return (
            <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
                <div className='row'>
                    <div className="row"><div className="col-md-4">&nbsp;</div></div>
                    <div className="col-md-4">
                        <Button variant='success'
                            onClick={() => { window.location.assign("/espai/" + this.state.id_espai); }}>
                            Afegir nou espai
                        </Button>
                    </div>
                    <div className="col-md-4">
                        <h1>Llistat d'espais</h1>
                    </div>
                </div>
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