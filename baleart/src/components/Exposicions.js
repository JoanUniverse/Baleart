import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, ListGroup } from "react-bootstrap";
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
export default class Exposicions extends Component {
    constructor(props) {
        super(props);

        const pintaBoto=(params)=>{
            return <div>
                <Button color="primary" size="sm"
                onClick={() => console.log(params.data.id_exposicio) /*{window.location.assign("exposicio/" + params.data.codiusuari)}*/}>
                    Edita
                </Button>
            </div>
        }

        const pintaBotoBorrar=(params)=>{
            return <div>
                <Button variant="danger" size="sm"
                onClick={() => console.log(params.data.id_exposicio) /*{window.location.assign("exposicio/" + params.data.codiusuari)}*/}>
                    Borrar
                </Button>
            </div>
        }

        this.state = {
            exposicions: [],
            columnes: [
                {field: "id_exposicio", headerName: "CODI", sortable:true, filter:true},
                {field: "titol_expo", headerName: "TÍTOL", sortable:true, filter:true, floatingFilter:true, minWidth:300, resizable:true},
                {field: "id_espai", headerName: "ESPAI", sortable:true, filter:true, floatingFilter:true},
                {field: "data_inici", headerName: "DATA INICI", sortable:true, filter:true},
                {field: "data_fi", headerName: "DATA FI", sortable:true, filter:true},
                {field: "descripcio_expo_ca", headerName: "DESCRIPCIÓ", sortable:true, filter:true, resizable:true},
                {headerName: "", cellRendererFramework:pintaBoto, maxWidth:100},
                {headerName: "", cellRendererFramework:pintaBotoBorrar, maxWidth:100}
            ],
        }
    }
    
    componentDidMount() {
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token")}
            //headers: { Authorization: 'Bearer ' + "token"}
        };

        axios.get('http://baleart.projectebaleart.com/public/api/exposicions', config)
            .then(response => {
                console.log(response);
                this.setState({ exposicions: response.data});
            })
            .catch(function (error) {
                console.log("ERROR -> " + error.response.data.error);
                if(error.response.status == 401){
                    //window.location.assign("/login");
                }
            })
    }

    render() {
        return (
            <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
                <AgGridReact
                    rowData={this.state.exposicions}
                    columnDefs={this.state.columnes}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
            </div>
        );
    }
}