import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import Chart from '../Chart/Chart';
const CarouselSlide = () => {
    const [carouselData, setCarouselData] = useState([]);
    const [pageCount,setPageCount] = useState(0);
    useEffect(() =>{
        fetch('https://sleepy-coast-60059.herokuapp.com/products')
        .then((response) => response.json())
        .then(data => {
            setCarouselData(data.products);
            const count = data.count;
            const pageNumber = Math.ceil(count/12);
            setPageCount(pageNumber);
        })
    },[])
    
    return (
        <div className="boxSizing row mt-4 mb-3 carousel-width global-side-padding">
            <div className="col-lg-1">

            </div>
            <div className="col-lg-5">
                <Chart></Chart>
            </div>
            <div className='col-lg-1'>

            </div>
            <div className="col-lg-4">
                {/* <div className='bg-danger z-index-carousel'> */}
                    <Carousel fade>
                        {
                            carouselData.map(data =>
                                <Carousel.Item>
                                    <img
                                        className='w-100 h-100'
                                        src={data.img}
                                        alt="First slide"
                                    />
                                </Carousel.Item>
                            )
                        }
                    </Carousel>
                {/* </div> */}
            </div>
            <div className="col-lg-1">

            </div>
        </div>
    );
};

export default CarouselSlide;