import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../Utilities/databaseManager';
import { Card, ListGroup } from 'react-bootstrap';
import SelectProducts from '../SelectProducts/SelectProducts';
import './Buy.css';
import { useHistory } from 'react-router-dom';
// import { useAlert } from 'react-alert'

const Buy = () => {
    //   const alert = useAlert();
    // const { productKey } = useParams();
    const [filterProducts, setFilterProducts] = useState([]);
    useEffect(() => {
        const selectProduct = getDatabaseCart();
        console.log(selectProduct);
        const keys = Object.keys(selectProduct);
        console.log(keys);
        fetch('http://localhost:7777/products/keys', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(keys),
        })
            .then(response => response.json())
            .then(products => {
                // console.log(products);
                setFilterProducts(products);
            })
            .then(error => {
                console.log(error);
            })
        // const productKeys = Object.keys(selectProduct);
        // // const counts = productKeys.map(key => selectProduct[key]);
        // // console.log(counts);

        // const newSelectProducts =  productKeys.map(key => {
        //     const FProduct = fakeData.find(pd=> pd.key === key);
        //     return FProduct;
        // })
        // setFilterProducts(newSelectProducts);
    }, [])
    // console.log(filterProducts);
    const [cartProducts, setCartProducts] = useState([]);
    const handleAddToCartProduct = (cartProduct) => {
        const newCartProduct = [...cartProducts, cartProduct];
        setCartProducts(newCartProduct);
    }
    const total = Math.ceil(cartProducts.reduce((total, prod) => total + prod.price, 0));
    // console.log(cartProducts);
    let shippingCost = 0;
    if (total > 0 && total < 500) {
        shippingCost = 13;
    }
    const vat = Math.ceil(total * 0.05);

    const finalTotal = total + shippingCost + vat;


    const removeProduct = (productKey) => {
        const newFilterProduct = filterProducts.filter(pd => pd.key !== productKey);
        setFilterProducts(newFilterProduct);
        removeFromDatabaseCart(productKey);
    }
    const history = useHistory();
    const purchasedDone = () => {
        history.push('/ordered');
        // setCartProducts([]);
        // alert('Oh look, an alert!');
    }
    return (
        <div className="row boxSizing p-2">
            <div className="col-lg-8">
                {
                    filterProducts.map(filterPd => <SelectProducts removeProduct={removeProduct} handleAddToCartProduct={handleAddToCartProduct} filterPd={filterPd} key={filterPd.key}></SelectProducts>)
                }
            </div>
            <div className="col-lg-4 mt-3 d-flex justify-content-center">
                <Card style={{ width: '18rem', height: '15rem' }}>
                    <Card.Header className="cart">ADD TO CART</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Total Products: {cartProducts.length}</ListGroup.Item>
                        <ListGroup.Item>Shipping cost: {shippingCost}</ListGroup.Item>
                        <ListGroup.Item>VAt: {vat}</ListGroup.Item>
                        <ListGroup.Item>Total:{finalTotal}</ListGroup.Item>
                        <button onClick={purchasedDone} className="btn btn-primary">Purchase order</button>
                    </ListGroup>
                </Card>
            </div>
        </div>
    );
};

export default Buy;