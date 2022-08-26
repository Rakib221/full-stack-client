import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FiShoppingCart } from 'react-icons/fi';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
const Product = (props) => {
    const { category, img, price, shipping, stock, name, _id } = props.product;
    // onClick = {()=>props.handleAddProduct(props.product)}
    return (
            <div classNam="boxSizing">
                <Card style={{ width: '18rem' }}>
                    <Card.Img style={{ width: '16rem', height: '250px' }} className='center' variant="top" src={img} />
                    <Card.Body>
                        <Card.Title style={{ textTransform: 'capitalize' }}>{category}</Card.Title>
                        <Card.Text style={{ height: '150px' }}>
                            {name}
                        </Card.Text>
                        <div style={{ height: '180px' }}>
                            <Card.Title>Price: {price} $</Card.Title>
                            <Card.Title>Shipping cost: {shipping} $</Card.Title>
                            <Card.Title><span style={{ color: 'red' }}>{stock}</span> available. Please order hurry up</Card.Title>
                            <h3><Link to={"/product/"+_id}><Button onClick={() => props.handleAddProduct(props.product)} style={{ width: '200px' }} variant="danger"><FiShoppingCart/>Buy</Button></Link></h3>
                            {/* <Button onClick={() => props.handleAddProduct(props.product)} style={{ width: '200px' }} variant="danger"><FiShoppingCart />Buy</Button> */}
                        </div>
                    </Card.Body>
                </Card>
            </div>

    );
};

export default Product;