import React, { useContext } from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
        <div>
            <Navbar className="d-flex justify-content-between" bg="primary" variant="dark">
                <Navbar.Brand as={Link} to="/home">Moto Riders</Navbar.Brand>
                <div>
                    <Nav className="mr-auto d-flex align-items-center">
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/destination">Destination</Nav.Link>
                        <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                        {loggedInUser.isSignedIn ? <Nav.Link ><strong>{loggedInUser.name}</strong></Nav.Link>:
                        <Button as={Link} to="/login" variant="outline-light">Login</Button>}
                    </Nav>
                </div>
            </Navbar>
        </div>
    );
};

export default Header;