import React, { Component } from 'react';
import { BrowserRouter, NavLink, Route, Routes, useParams } from "react-router-dom";
//import Comentaris from './Comentaris';
//import Obres from './Obres';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/css/estilos.css';
import { Nav, Navbar, Container } from "react-bootstrap";
import Autors from './Autors';
import Espais from './Espais';
import Exposicions from './Exposicions';
import Modalitats from './Modalitats';
import Exposicio from './Exposicio';
import Autor from './Autor';
import Espai from './Espai';
export default class Menu extends Component {
    render() {
        return (
            <BrowserRouter>
                <Navbar bg="dark" className="color-nav" variant="dark" expand="lg" sticky="top">
                    <Container>
                        <Nav className="mr-auto">
                            <NavLink className="nav-link" to="/autors" >Autors</NavLink>
                            <NavLink className="nav-link" to="/comentaris" >Comentaris</NavLink>
                            <NavLink className="nav-link" to="/espais" >Espais</NavLink>
                            <NavLink className="nav-link" to="/exposicions" >Exposicions</NavLink>
                            <NavLink className="nav-link" to="/modalitats" >Modalitats</NavLink>
                            <NavLink className="nav-link" to="/obres">Obres</NavLink>
                            <NavLink className="nav-link" to="/serveis" >Serveis</NavLink>
                            <NavLink className="nav-link" to="/tipus" >Tipus</NavLink>
                            <NavLink className="nav-link" to="/usuaris" >Usuaris</NavLink>
                        </Nav>

                        <input className="form-control mr-sm-2" type="search" placeholder="Cercar espai..." aria-label="Search"></input>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Cercar</button>

                        <Nav className="mr-auto">
                            <NavLink className="nav-link" to="/autors" >Perfil</NavLink>
                        </Nav>
                    </Container>
                </Navbar>
                <Routes>
                    <Route path='/autors' element={<Autors />} />
                    <Route path='/autor/:id_autor' element={<CridaAutor />} />
                    {/* <Route path="/comentaris" element={<Comentaris />} /> */}
                    <Route path='/espais' element={<Espais />} />
                    <Route path='/exposicio/:id_exposicio' element={<CridaExposicio />} />
                    <Route path='/espai/:id_espai' element={<CridaEspai />} />
                    <Route path='/exposicions' element={<Exposicions />} />
                    <Route path='/modalitats' element={<Modalitats />} />
                    {/* <Route path="/obres" element={<Obres />} /> */}
                    {/* <Route path='/serveis' element={<Serveis />} /> */}
                    {/* <Route path='/tipus' element={<Tipus />} /> */}
                    {/* <Route path='/usuaris' element={<Usuaris />} /> */}
                </Routes>
            </BrowserRouter>

        )
    }
}


function CridaExposicio(){
    let params = useParams();
    return <Exposicio id_exposicio={params.id_exposicio}/>

function CridaAutor() {
    let params = useParams();
    return <Autor id_autor={params.id_autor} />
}

function CridaEspai() {
    let params = useParams();
    return <Espai id_espai={params.id_espai} />
}