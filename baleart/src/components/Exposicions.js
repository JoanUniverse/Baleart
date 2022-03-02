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

        // const pintaBoto=(params)=>{
        //     return <div>
        //         <Button color="primary" size="sm"
        //         onClick={() => {window.location.assign("usuari/" + params.data.codiusuari)}}>
        //             Edita
        //         </Button>
        //     </div>
        // }

        this.state = {
            exposicions: [],
            columnes: [
                {field: "id_exposicio", headerName: "CODI", sortable:true, filter:true},
                {field: "titol_expo", headerName: "TÍTOL", sortable:true, filter:true, floatingFilter:true, minWidth:300, resizable:true},
                {field: "data_inici", headerName: "DATA INICI", sortable:true, filter:true},
                {field: "data_fi", headerName: "DATA FI", sortable:true, filter:true},
                // {headerName: "", cellRendererFramework:pintaBoto, maxWidth:100}
            ],
        }
    }
    componentDidMount() {
        const config = {
            headers: { Authorization: 'Bearer MGNDdnhDRU9sR2pJSkJuaXBRSEhNa1oyZFZsWUlWQnZPdWg0RXUxMg==' }
        };
        axios.get('http://baleart.projectebaleart.com/public/api/exposicions', config)
            .then(response => {
                console.log(response);
                this.setState({ exposicions: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="ag-theme-alpine" style={{ height: 400, width: 900 }}>
                <AgGridReact
                    rowData={this.state.exposicions}
                    columnDefs={this.state.columnes}
                    pagination={true}
                    paginationPageSize={5}>
                </AgGridReact>
            </div>
        );
    }
}