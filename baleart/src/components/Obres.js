import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, ListGroup } from "react-bootstrap";
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
export default class Obres extends Component {
    constructor(props) {
        super(props);

        const pintaBoto = (params) => {
            return <div>
                <Button color="primary" size="sm"
                    onClick={() => { window.location.assign("/obra/" + params.data.id_obra) }}>
                    Edita
                </Button>
            </div>
        }

        const pintaBotoBorrar=(params)=>{
            return <div>
                <Button variant="danger" size="sm"
                    onClick={() => {
                        if(window.confirm("Segur vols borrar l'obra?")){
                            this.borrar(params.data.id_obra);
                        }
                    }}>
                    Borrar
                </Button>
            </div>
        }

        const pintaFoto = (params) => {
            return <div>
                <img src={params.data.fotografia} alt='' width='70' />
            </div>
        }

        this.state = {
            obres: [],
            columnes: [
                { field: "id_obra", headerName: "ID OBRA", sortable: true, filter: true },
                { field: "id_autor", headerName: "ID ESPAI", sortable: true, filter: true },
                { field: "id_exposicio", headerName: "ID EXPOSICIO", sortable: true, filter: true, floatingFilter: true },
                { field: "id_modalitat", headerName: "ID MODALITAT", sortable: true, filter: true, floatingFilter: true },
                { field: "titol", headerName: "TITOL", sortable: true, filter: true, floatingFilter: true },
                { field: "any_data", headerName: "ANY DATA", sortable: true, filter: true },
                { field: "descripcio_obra_es", headerName: "DESCRIPCIÓ", sortable: true, filter: true, resizable: true },
                { field: "fotografia", headerName: "FOTOGRAFIA", cellRendererFramework: pintaFoto, maxWidth: 150 },
                { field: 'id_autor', headerName: '', cellRendererFramework: pintaBoto, maxWidth: 100 },
                { field: 'id_autor', headerName: '', cellRendererFramework: pintaBotoBorrar, maxWidth: 100 }
            ],
            id_obra: -1,
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
        axios.get('http://baleart.projectebaleart.com/public/api/obres', config)
            .then(response => {
                console.log(response);
                this.setState({ obres: response.data });
            })
            .catch(function (error) {
                console.log("ERROR -> " + error.response.data.error);
                if (error.response.status === 401) {
                    //window.location.assign("/login");
                }
            })
    }
    borrar = (id_obra) => {
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
        };
        axios.delete('http://baleart.projectebaleart.com/public/api/obres/' + id_obra, config
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
                            onClick={() => { window.location.assign("/obra/-1"); }}>
                            Afegir nova obra
                        </Button>
                    </div>
                    <div className="col-md-4">
                        <h1>Llistat de obres</h1>
                    </div>
                </div>
                <AgGridReact
                    rowData={this.state.obres}
                    columnDefs={this.state.columnes}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
            </div>
        );
    }
}