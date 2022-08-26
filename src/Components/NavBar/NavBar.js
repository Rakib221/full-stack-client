import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsCartCheckFill } from 'react-icons/bs';
import Image from '../Images/logo.png';
import { GrLocation } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import useAuth from '../Hook/useAuth';
import { useContext } from 'react';
import { UserContext } from '../../App';
const NavBar = () => {

    const [ navBarAndFooter, setNavBarAndFooter ] = useContext(UserContext);

    const { loggedAndSignedInUser, handleSignOutByGoogle } = useAuth();
    const handleSignedOut = () => {
        localStorage.removeItem('data');
        handleSignOutByGoogle();
    }

    const handleNavBarAndFooter = (text) => {
        // const changeCondition = { ...navBarAndFooter };
        // if ((text === "home") || (text === "map")) {
        //     changeCondition.navBar = true;
        //     changeCondition.footer = true;
        //     setNavBarAndFooter(changeCondition);
        // }
        // else if (text === "dashBoard") {
        //     changeCondition.navBar = false;
        //     changeCondition.footer = false;
        //     setNavBarAndFooter(changeCondition);
        // }
        // else if ((text === "returnAndOrders") || (text === "cart")) {
        //     changeCondition.navBar = true;
        //     changeCondition.footer = false;
        //     setNavBarAndFooter(changeCondition);
        // }
    }

    return (
        <div className='boxSizing nav-bar-sticky'>
            <Navbar bg="danger" expand="lg">
                <Container fluid><Navbar.Brand href="#"><img className='navHover p-1 image-style' src={Image} /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link onClick={()=>handleNavBarAndFooter("home")} as={Link} to="/home">Home</Nav.Link>
                            <Nav.Link onClick={()=>handleNavBarAndFooter("map")} as={Link} to="/map">
                                <div><span>Welcome</span><GrLocation /><span style={{ 'font-weight': 'bold' }}>Select a shopping address.</span>
                                </div>
                            </Nav.Link>
                            <Form className="d-flex form-style">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                            <NavDropdown title={`Welcome to login account and list`} id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">
                                    Something else here
                                </NavDropdown.Item>
                            </NavDropdown>
                            {
                                !loggedAndSignedInUser.uid ? <Nav.Link as={Link} to="/login">Login</Nav.Link> : <Nav.Link onClick={handleSignedOut}>Sign out</Nav.Link>
                            }
                            <Nav.Link onClick={()=>handleNavBarAndFooter("dashBoard")} as={Link} to="/dashBoard">DashBoard</Nav.Link>
                            <Nav.Link onClick={()=>handleNavBarAndFooter("returnAndOrders")} as={Link} to="/returnAndOrders">Returns and orders</Nav.Link>
                            <Nav.Link onClick={()=>handleNavBarAndFooter("cart")} as={Link} to="/cart"><BsCartCheckFill size="35" /></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;