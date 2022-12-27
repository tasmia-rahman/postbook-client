import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from './../../../contexts/AuthProvider/AuthProvider';

const Header = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogOut = () => {
        logout()
            .then(() => {
                // Sign-out successful.
            }).catch((error) => {
                // An error happened.
            })
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="white" variant="light">
            <Container>
                <Navbar.Brand href="/">
                    <h3>Postbook</h3>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Link className='nav-link' to='/'>Home</Link>
                        <Link className='nav-link' to='/media'>Media</Link>
                        <Link className='nav-link' to='/message'>Message</Link>
                        <Link className='nav-link' to='/about'>About</Link>
                    </Nav>
                    <Nav>
                        {
                            user?.uid ?
                                <>
                                    <Link className='nav-link' onClick={handleLogOut}>Log out</Link>
                                </>
                                :
                                <>
                                    <Link className='nav-link' to='/signup'>Sign Up</Link>
                                    <Link className='nav-link' to='/login'>Login</Link>
                                </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;