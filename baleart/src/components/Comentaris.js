import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
export default class Comentaris extends Component {
    constructor(props) {
        super(props);

        const pintaBoto = (params) => {
            return <div>
                <Button color="primary" size="sm"
                    onClick={() => { window.location.assign("/comentari/" + params.data.id_comentari); }}>
                    Edita
                </Button>
            </div>
        }

        const botoEsborrar = (params) => {
            return <div>
                <Button variant='danger' size="sm"
                    onClick={() => {
                        if (window.confirm("Segur que vols borrar el comentari?")) {
                            this.borrar(params.data.id_comentari);
                        }
                    }}>
                    Borrar
                </Button>
            </div>
        }

        this.state = {
            comentaris: [],
            columnes: [
                { field: "id_comentari", headerName: "CODI COMENTARI", sortable: true, filter: true },
                { field: "id_usuari", headerName: "CODI USUARI", sortable: true, filter: true },
                { field: "id_espai", headerName: "ESPAI", sortable: true, filter: true, floatingFilter: true },
                { field: "comentari", headerName: "COMENTARI", sortable: true, filter: true, floatingFilter: true },
                { field: "data", headerName: "DATA", sortable: true, filter: true, },
                { field: 'id_comentari', headerName: '', cellRendererFramework: pintaBoto, maxWidth: 100 },
                { field: 'id_comentari', headerName: '', cellRendererFramework: botoEsborrar, maxWidth: 100 }
            ],
            id_comentari: -1,
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
        axios.get('http://baleart.projectebaleart.com/public/api/comentaris', config)
            .then(response => {
                console.log(response);
                this.setState({ comentaris: response.data });
            })
            .catch(function (error) {
                console.log("ERROR -> " + error.response.data.error);
                if (error.response.status === 401) {
                    //window.location.assign("/login");
                }
            })
    }

    borrar = (id_comentari) => {
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
        };
        axios.delete('http://baleart.projectebaleart.com/public/api/comentaris/' + id_comentari, config
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
                            onClick={() => { window.location.assign("/comentari/-1"); }}>
                            Afegir nou comentari
                        </Button>
                    </div>
                    <div className="col-md-4">
                        <h1>Llistat de comentaris</h1>
                    </div>
                </div>
                <AgGridReact
                    rowData={this.state.comentaris}
                    columnDefs={this.state.columnes}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
            </div>
        );
    }
}