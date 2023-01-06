import React from 'react';
import { useRef } from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsCartCheckFill } from 'react-icons/bs';
import Image from '../Images/logo.png';
import { GrLocation } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import useAuth from '../Hook/useAuth';
import { useContext } from 'react';
import { UserContext } from '../../App';
var sessionstorage = require('sessionstorage');
const NavBar = () => {

    const [navBarAndFooter, setNavBarAndFooter] = useContext(UserContext);

    const { loggedAndSignedInUser, handleSignOutByGoogle , setCategory} = useAuth();
    const handleSignedOut = () => {
        localStorage.removeItem('data');
        handleSignOutByGoogle();
    }

    const categoryRef = useRef('');

    const handleCategory = () => {
        const category = categoryRef.current.value;
        if (category.length <= 0) {
            alert("Please entry category name one of these (android, laptop, camera)");
        }
        // console.log('category ', category);
        setCategory(category);
        // sessionstorage.setItem('category', category);
        categoryRef.current.value = '';
    }

    const handleEnterKey = (event) => {
        if (event.key === 'Enter') {
            handleCategory();
            event.preventDefault();
        }
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
                {/* <div> */}
                    <Container fluid><Navbar.Brand href="#"><img className='navHover p-1 image-style text-color margin-left' src={Image} /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link onClick={() => handleNavBarAndFooter("home")} as={Link} to="/home"><span className='text-color'>Home</span></Nav.Link>
                                <Nav.Link onClick={() => handleNavBarAndFooter("map")} as={Link} to="/map">
                                    <div className='text-color'><span>Welcome</span><GrLocation /><span style={{ 'font-weight': 'bold' }}>Select a shopping address.</span>
                                    </div>
                                </Nav.Link>
                                <Form className="d-flex form-style me-2 length">
                                    {/* <FormControl
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                    /> */}
                                    <input placeholder = "android, laptop, camera" type="search" ref={categoryRef} className="length rounded" onKeyDown = {handleEnterKey}></input>
                                    <Button onClick={handleCategory} variant="outline-success" aria-label="Search"><span className='text-color'>Search</span></Button>
                                </Form>
                                <Nav.Link onClick={() => handleNavBarAndFooter("serviceAndReturn")} as={Link} to="/serviceAndReturn"><span className='text-color'>Our Service and return policy</span></Nav.Link>
                                {
                                    !loggedAndSignedInUser.uid ? <Nav.Link as={Link} to="/login"><span className='text-color'>Login</span></Nav.Link> : <Nav.Link onClick={handleSignedOut}><span className='text-color'>Sign out</span></Nav.Link>
                                }
                                <Nav.Link onClick={() => handleNavBarAndFooter("dashBoard")} as={Link} to="/dashBoard"><span className='text-color'>Dash Board</span></Nav.Link>
                                <Nav.Link onClick={() => handleNavBarAndFooter("returnAndOrders")} as={Link} to="/returnAndOrders"><span className='text-color'>Returns and orders</span></Nav.Link>
                                <Nav.Link onClick={() => handleNavBarAndFooter("cart")} as={Link} to="/cart"><BsCartCheckFill size="35" /></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                {/* </div> */}
            </Navbar>
        </div>
    );
};

export default NavBar;