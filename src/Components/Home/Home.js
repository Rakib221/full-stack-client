import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useRouteMatch } from 'react-router';
import { UserContext } from '../../App';
import CarouselSlide from '../CarouselSlide/CarouselSlide';
import Shop from '../Shop/Shop';

const Home = () => {
    let { path, url } = useRouteMatch();
    const [navBarAndFooter, setNavBarAndFooter] = useContext(UserContext);
    useEffect(() =>{
        if (path === "/" || path === "/home"){}{
          const changeState = { ...navBarAndFooter };
          changeState.navBar = true;
          changeState.footer = true;
          setNavBarAndFooter(changeState);
        }
    },[])
    return (
        <div>
        <CarouselSlide></CarouselSlide>
        <Shop></Shop>
        </div>
    );
};

export default Home;