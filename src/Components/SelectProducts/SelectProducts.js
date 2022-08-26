import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FiShoppingCart } from 'react-icons/fi';
import { AiOutlineStar } from 'react-icons/ai';
const SelectProducts = (props) => {
    const { name, img, price, star, seller, _id } = props.filterPd;
    const [count, setCount] = useState(0);
    return (
        <Card className="boxSizing p-3 m-3">
            <div className="row">
                <div className="col-lg-5">
                    <img style={{ width: '218px', height: '218px' }} src={img} alt="selected product image" />
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
                <Button onClick={() =>props.removeProduct(_id)} className="mx-2" style={{ width: '150px' }} variant="danger"><FiShoppingCart />Remove</Button>
                <h4 className="px-2">
                    {star} <AiOutlineStar />
                </h4>
            </div>
        </Card>
    );
};

export default SelectProducts;