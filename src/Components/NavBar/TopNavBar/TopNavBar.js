import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import Image from '../../Images/logo.png';
import Map from '../../Map/Map';
import { BsCartCheckFill } from 'react-icons/bs';
const TopNavBar = () => {
    return (
        <div className='boxSizing' style={{ height: '90px' }}>
            <Navbar bg="danger" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#"><img className='navHover p-1' style={{ width: '150px', height: '60px' }} src={Image} /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/map">
                                <Map></Map>
                            </Nav.Link>
                            <Form style={{ width: '700px', height: '50px' }} className="d-flex">
                            <Form.Select id="inlineFormCustomSelect" style={{ width: '100px'}}>
                                    <option value="0">Choose...</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
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
                            <Nav.Link href="/returnAndOrders">Returns and orders</Nav.Link>
                            <Nav.Link href="/cart"><BsCartCheckFill size="35" /></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default TopNavBar;