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
                    onClick={() => { window.location.assign("/modalitat/" + params.data.id_modalitat) }}>
                    Edita
                </Button>
            </div>
        }

        const pintaBotoEsborrar = (params) => {
            return <div>
                <Button variant='danger' size="sm"
                    onClick={() => {
                        if (window.confirm("Segur que vols borrar la modalitat?")) {
                            this.borrar(params.data.id_modalitat);
                        }
                    }}>
                    Borrar
                </Button>
            </div>
        }

        this.state = {
            modalitats: [],
            columnes: [
                { field: "id_modalitat", headerName: "CODI", sortable: true, filter: true },
                { field: "descripcio_modalitat_ca", headerName: "DESCRIPCIÓ", sortable: true, filter: true, floatingFilter: true },
                { field: 'id_modalitat', headerName: '', cellRendererFramework: pintaBoto, maxWidth: 100 },
                { field: 'id_modalitat', headerName: '', cellRendererFramework: pintaBotoEsborrar, maxWidth: 100 }
            ],
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
        axios.get('http://baleart.projectebaleart.com/public/api/modalitats', config)
            .then(response => {
                console.log(response);
                this.setState({ modalitats: response.data });
            })
            .catch(function (error) {
                console.log("ERROR -> " + error.response.data.error);
                if (error.response.status === 401) {
                    //window.location.assign("/login");
                }
            })
    }

    borrar = (id_modalitat) => {
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
        };
        axios.delete('http://baleart.projectebaleart.com/public/api/modalitats/' + id_modalitat, config
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
                            onClick={() => { window.location.assign("/modalitat/-1"); }}>
                            Afegir nova modalitat
                        </Button>
                    </div>
                    <div className="col-md-4">
                        <h1>Llistat de modalitats</h1>
                    </div>
                </div>
                <AgGridReact
                    rowData={this.state.modalitats}
                    columnDefs={this.state.columnes}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
            </div>
        );
    }
}