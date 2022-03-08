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

        const botoEsborrar = (params) => {
            return <div>
                <Button variant='danger' size="sm"
                    onClick={() => { window.location.assign("/modalitat/" + params.data.id_modalitat); }}>
                    Borrar
                </Button>
            </div>
        }

        this.state = {
            modalitats: [],
            columnes: [
                { field: "id_modalitat", headerName: "CODI", sortable: true, filter: true },
                { field: "descripcio_modalitat_ca", headerName: "DESCRIPCIÓ", sortable: true, filter: true, floatingFilter: true },
                { field: 'id_modalitat', headerName: '', cellRendererFramework: botoEsborrar, maxWidth: 100 }
            ],
        }
    }
    componentDidMount() {
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

    render() {
        return (
            <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
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