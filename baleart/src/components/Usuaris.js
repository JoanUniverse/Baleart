import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, ListGroup } from "react-bootstrap";
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
export default class Usuaris extends Component {
    constructor(props) {
        super(props);

        const pintaBoto=(params)=>{
            return <div>
                <Button color="primary" size="sm"
                    onClick={() => {window.location.assign("/usuaris/" + params.data.id_usuari)}}>
                    Edita
                </Button>
            </div>
        }

        const pintaBotoBorrar=(params)=>{
            return <div>
                <Button variant="danger" size="sm"
                    onClick={() => {
                        if(window.confirm("Segur vols borrar l'usuari?")){
                            this.borrar(params.data.id_exposicio);
                        }
                    }}>
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
            id_exposicio : -1
        }
    }

    borrar = (id) =>{
        const config = {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
        };
        axios.delete('http://baleart.projectebaleart.com/public/api/exposicions/' + id, config)
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

    descarrega(){
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
                <div className='row'>
                <div className="row"><div className="col-md-4">&nbsp;</div></div>
                    <div className="col-md-4">
                        <Button variant='success'
                            onClick={() => {window.location.assign("/exposicio/" + this.state.id_exposicio)}}>
                            Afegir nova
                        </Button>
                    </div>
                    <div className="col-md-4">
                        <h1>Llistat de exposicions</h1>
                    </div>
                </div>
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