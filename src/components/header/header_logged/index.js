import React, { useState } from 'react';
import { Navbar, Container, Column, Button, Dropdown } from 'rbx';
import logoImage from '../../../assets/images/logo-white.png'; //é mais comum importarmos a imagem na variavel do que colocoar o codigo varias vezes
import '../../../styles/header.scss'
import { Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons'; //aqui estou importando um icone especifico

import UserService from '../../../services/users'; //aqui estou importando meu serviço, e vou precisar de um método que lide com ele (no caso aqui, com o submit)


function HeaderLogged(props) { //recebe props
    const [redirectToHome, setRedirectToHome] = useState(false); //crio um state com um método de redirecionamento
    const [user, setUser] = useState(localStorage.getItem('user'))

    const logOut = async () => {
        await UserService.logout();
        setRedirectToHome(true);
    };

    if (redirectToHome === true) {
        return <Redirect to={{ pathname: '/' }} />
    }
    //navbar.manu só aparece no desktop!!! é o default.
    return (
        <Navbar color="custom-purple" className="navbar-logged">
            <Navbar.Brand>
                <Column.Group>
                    <Column size="11" offset="1">
                        <Link to="/notes">
                            <img src={logoImage} />
                        </Link>
                    </Column>
                </Column.Group>
                <Navbar.Burger
                    className="navbar-burger burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbar-menu">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </Navbar.Burger>
            </Navbar.Brand>

            <Navbar.Menu>
                <Navbar.Segment as="div" className="navbar-item navbar-start" align="start">
                    <Navbar.Item as="div">
                        <Button
                            className="open-button"
                            color="white"
                            outlined //aqui chamo a funcao - que veio como props do elemento pai -  que vai mudar o state do meu is open on click!
                            onClick={() => props.setIsOpen(true)}> 
                            <FontAwesomeIcon icon={faList} />
                        </Button>
                    </Navbar.Item>
                </Navbar.Segment>
                <Navbar.Segment as="div" className="navbar-item navbar-end" align="right">
                    <Navbar.Item as="div">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <Button className="button" color="white" outlined>
                                    <span>{JSON.parse(user)['name']} ▼</span>
                                </Button>
                            </Dropdown.Trigger>
                            <Dropdown.Menu>
                                <Dropdown.Content>
                                    <Dropdown.Item as="div">
                                        <Link to="/users/edit">User Edit</Link>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item as="div">
                                        <a href="#" onClick={e => logOut()}>LogOut</a>
                                    </Dropdown.Item>
                                </Dropdown.Content>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Item>
                </Navbar.Segment>
            </Navbar.Menu>
        </Navbar>
    )
}

export default HeaderLogged;