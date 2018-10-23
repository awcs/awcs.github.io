import React, { Component } from 'react';
import './Navbar.css';
import Search from '../Search/Search';
import { Link, Router, } from "react-router-dom";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import {  Navbar as Navbarr, Nav, NavItem, NavLink,} from 'reactstrap';



class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal : false
    }
  }

  toggle = () =>{
    this.setState({ modal : !this.state.modal})
  }

  refresh =() => {
    Router.dispatch(window.location.getCurrentPath, null);
  } 
    
  render(){
    return (
        <div>
          <Navbarr className="top-fixed-navbar" expand="xs">
            <Link onClick={this.refresh} to="/">
              <h1 className="logo-cine">CINE</h1>
              <h1 className="logo-react">REACT</h1>
            </Link>
            <Search functionUpdateMovie={this.props.functionUpdateMovie}/>
            <Nav className="ml-auto" navbar>
              <NavItem className="mr-2">
                <NavLink tag={Link} to="/favoris">
                  <i className="fa fa-heart fa-1x icon mr-2"></i>
                  <span className="text-link-nav">Favoris</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.toggle}>
                  <i className="fa fa-envelope icon mr-2"></i>
                  <span className="text-link-nav">Contact</span>
                </NavLink>
              </NavItem>
            </Nav>
          </Navbarr>
          <Navbarr className="bottom-fixed-navbar">
            <Search functionUpdateMovie={this.props.functionUpdateMovie}/>
          </Navbarr>
          <Modal isOpen={this.state.modal} toggle={this.toggle} >
            <ModalHeader toggle={this.toggle} className="modal-contact">CONTACT</ModalHeader>
            <ModalBody className="modal-contact">
              <div>           
                <ul className="list-unstyled">
                  <li className="media">
                    <img src ={process.env.PUBLIC_URL + './images/Matthieu.jpg'} className="rounded-circle profile pull-left"></img>
                    <div className="media-body">
                      <h5 className="mt-0 mb-1 ml-3">Matthieu Petit</h5>
                      <a className="ml-3 git" href="https://github.com/MatPlume" rel="noopener noreferrer"target="_blank">https://github.com/MatPlume</a>
                    </div>
                  </li>
                  <li className="media my-4">
                    <img src ={process.env.PUBLIC_URL + './images/Matthieu.jpg'} className="rounded-circle profile pull-left"></img>
                    <div className="media-body">
                      <h5 className="mt-0 mb-1 ml-3">Maéva Duran</h5>
                      <a  className="ml-3 git" href="https://github.com/mae-va" rel="noopener noreferrer" target="_blank">https://github.com/mae-va</a>
                    </div>
                  </li>
                  <li className="media mb-4">
                    <img src ={process.env.PUBLIC_URL + './images/Matthieu.jpg'} className="rounded-circle profile pull-left"></img>
                    <div className="media-body">
                      <h5 className="mt-0 mb-1 ml-3">Antoine Nourris</h5>
                      <a className="ml-3 git" href="https://github.com/awcs" rel="noopener noreferrer" target="_blank">https://github.com/awcs</a>
                    </div>
                  </li>
                  <li className="media">
                    <img src ={process.env.PUBLIC_URL + './images/Matthieu.jpg'} className="rounded-circle profile pull-left"></img>
                    <div className="media-body">
                      <h5 className="mt-0 mb-1 ml-3">Tiphaine Deswarte</h5>
                      <a  className="ml-3 git" href= "https://github.com/TiphaineDSW" rel="noopener noreferrer" target="_blank">https://github.com/TiphaineDSW</a>
                    </div>
                  </li>
                </ul>
              </div>
            </ModalBody>
          </Modal>
        </div>
      )
    }
  }

export default Navbar;