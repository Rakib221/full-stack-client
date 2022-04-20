import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import Charts from '../Charts/Charts';
const CarouselSlide = () => {
    const [carouselData, setCarouselData] = useState([]);
    useEffect(() =>{
        fetch('http://localhost:7777/products')
        .then((response) => response.json())
        .then(data => setCarouselData(data))
    },[])

        console.log(carouselData);
    return (
        <div className="boxSizing row mt-4 mb-3">
            <div className="col-lg-1">

            </div>
            <div className="col-lg-5">
                <Charts></Charts>
            </div>
            <div className='col-lg-1'>

            </div>
            <div className="col-lg-4">
                <div className='bg-danger'>
                    <Carousel fade>
                        {
                            carouselData.map(data =>
                                <Carousel.Item>
                                    <img
                                        className='w-100 h-100'
                                        src={data.imgUrl}
                                        alt="First slide"
                                    />
                                </Carousel.Item>
                            )
                        }
                    </Carousel>
                </div>
            </div>
            <div className="col-lg-1">

            </div>
        </div>
    );
};

export default CarouselSlide;