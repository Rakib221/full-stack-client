import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FiShoppingCart } from 'react-icons/fi';
import { AiOutlineStar } from 'react-icons/ai';
import { FaMinus } from 'react-icons/fa';
import { BsPlusLg } from 'react-icons/bs';
import './SelectProducts.css';
const SelectProducts = (props) => {
    const { name, img, price, star, seller,key } = props.filterPd;
    // console.log(props.filterPd.key);
    const [count, setCount] = useState(0);
    return (
        <Card className="boxSizing p-3 m-3">
            <div className="row">
                <div className="col-lg-5">
                    <img src={img} alt="" />
                </div>
                <div className="col-lg-7">
                    <p>{name}</p>
                    <p style={{color:'green'}}>Possibility of FREE delivery</p>
                    <p style={{ color: 'red' }}>Price:{price}</p>
                    <p>Seller: {seller}</p>
                    {/* <p>
                        <button disabled={count < 1} onClick={() => setCount(count-1)} className='btn'>
                            <FaMinus />
                        </button>
                        <button className='btn'>
                            {count}
                        </button>
                        <button onClick={() => setCount(count+1)} className='btn'>
                            <BsPlusLg />
                        </button>
                    </p> */}
                </div>
            </div>
            {/* onClick={() => props.handleAddProduct(props.product)} */}
            <div className="d-flex justify-content-center align-items-center">
                <Button onClick={() => props.handleAddToCartProduct(props.filterPd)} style={{ width: '150px' }} variant="danger"><FiShoppingCart />Add to cart</Button>
                <Button onClick={() =>props.removeProduct(key)} className="mx-2" style={{ width: '150px' }} variant="danger"><FiShoppingCart />Remove</Button>
                <h4 className="px-2">
                    {star} <AiOutlineStar />
                </h4>
            </div>
        </Card>
    );
};

export default SelectProducts;