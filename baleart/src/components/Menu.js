import React, { Component } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Comentaris from './Comentaris';
import Obres from './Obres';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/estilos.css';
import { Nav, Navbar, Container } from "react-bootstrap";
export default class Menu extends Component {
    render() {
        return (
            <BrowserRouter>
                <Navbar bg="dark" className="color-nav" variant="dark" expand="lg" sticky="top">
                    <Container>
                        <Nav className="mr-auto">
                            <NavLink className="nav-link" to="/obres">Obres </NavLink>
                            <NavLink className="nav-link" to="/comentaris" >Comentaris</NavLink>
                            <NavLink className="nav-link" to="/comentaris" >Comentaris</NavLink>
                            <NavLink className="nav-link" to="/comentaris" >Comentaris</NavLink>
                            <NavLink className="nav-link" to="/comentaris" >Comentaris</NavLink>
                            <NavLink className="nav-link" to="/comentaris" >Comentaris</NavLink>
                            <NavLink className="nav-link" to="/comentaris" >Comentaris</NavLink>
                            <NavLink className="nav-link" to="/comentaris" >Comentaris</NavLink>
                            <NavLink className="nav-link" to="/comentaris" >Comentaris</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </Nav>
                            <input class="form-control mr-sm-2" type="search" placeholder="Cercar espai..." aria-label="Search"></input>
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Cercar</button>
                       
                    </Container>
                </Navbar>
                <Routes>
                    <Route path="/obres" element={<Obres />} />
                    <Route path="/comentaris" element={<Comentaris />} />
                </Routes>
            </BrowserRouter>

        )
    }
}