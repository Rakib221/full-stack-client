import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Offcanvas, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import TopNavBar from './TopNavBar/TopNavBar';
import { Link } from 'react-router-dom';
import useAuth from '../Hook/useAuth';
// import { UserContext } from '../../App';
const NavBar = () => {
    // const [loggedAndSignedInUser, setLoggedAndSignedInUser] = useContext(UserContext);
    const {loggedAndSignedInUser, setLoggedAndSignedInUser} = useAuth();
    const handleSignedOut = () =>{
        const outUser = {
            newUser: false,
            isGoogleSignIn: false,
            isFacebookSignIn: false,
            isGithubSignIn: false,
            success: false,
            signUpSuccess: false,
            signInSuccess: false,
            name: '',
            email: '',
            password: '',
            confirmPassword: false,
            error: '',
            alert: '',
            forgotPassword: false,
            accessToken:''
        }
        setLoggedAndSignedInUser(outUser);
    }
    return (
        <div className='boxSizing'>
            <TopNavBar></TopNavBar>
            <div className='row'>
                <Navbar bg="light" expand={false}>
                    <Container fluid>
                        <div className='col-lg-1'>
                            <Navbar.Toggle aria-controls="offcanvasNavbar" />
                            <Navbar.Offcanvas
                                id="offcanvasNavbar"
                                aria-labelledby="offcanvasNavbarLabel"
                                placement="start"
                            >
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <Nav className="justify-content-end flex-grow-1 pe-3">
                                        <Link to="/home">Home</Link>
                                        <Link to="#action2">Link</Link>
                                        <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="#action5">
                                                Something else here
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                    <Form className="d-flex">
                                        <FormControl
                                            type="search"
                                            placeholder="Search"
                                            className="me-2"
                                            aria-label="Search"
                                        />
                                        <Button variant="outline-success">Search</Button>
                                    </Form>
                                </Offcanvas.Body>
                            </Navbar.Offcanvas>
                        </div>
                        <div className="col-lg-7 d-flex">
                        <Nav.Link href="/home">Home</Nav.Link>
                            <NavDropdown title={`Prime`} id="navbarScrollingDropdown">
                                    <div style={{width:'100px', height:'100px'}}>
                                    <NavDropdown.Item href="#action3">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero temporibus mollitia perspiciatis natus, eveniet voluptate odit consequuntur minus officia modi voluptatum?
                                        </NavDropdown.Item> 
                                    </div>  
                            </NavDropdown>
                            <Link to="/ordered">Order</Link>
                            <Nav.Link href="#action1">Bestsellers</Nav.Link>
                            <Nav.Link href="#action2">Gift Cards</Nav.Link>
                            <Nav.Link href="#action1">Sell On Ema-John</Nav.Link>
                            <Nav.Link href="customer-service">Customer Service</Nav.Link>
                            <Link to="/route">Route</Link>
                        </div>
                        <div className="col-lg-1">

                        </div>
                        <div className="col-lg-3">
                            <Nav.Link href="#action2">Magic Gift Delivery With Prime</Nav.Link>
                            {
                                !loggedAndSignedInUser.uid?<button><Link to="/login">Sign In</Link></button>:<button onClick={handleSignedOut}>Sign out</button>
                            }
                            <Link to="/dashboard">Dash board</Link>
                            <Link to="/makeAdmin">Make Admin</Link>
                        </div>
                    </Container>
                </Navbar>
            </div>
        </div>
    );
};

export default NavBar;