import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useRouteMatch } from 'react-router';
import { UserContext } from '../../App';
import GoogleM from './GoogleM';
import GoogleMapDirec from './GoogleMapDirec';

const ShopLocationAndRoute = () => {
    let { path, url } = useRouteMatch();
    const [navBarAndFooter, setNavBarAndFooter] = useContext(UserContext);
    useEffect(() =>{
        if (path === "/returnAndOrders"){}{
          const changeState = { ...navBarAndFooter };
          changeState.navBar = true;
          changeState.footer = true;
          setNavBarAndFooter(changeState);
        }
    },[])
    return (
        <div className="direction">
            <div className="shop-route">
                <GoogleMapDirec></GoogleMapDirec>
            </div>
            <div className="shop-location">
                <GoogleM></GoogleM>
            </div>
        </div>
    );
};

export default ShopLocationAndRoute;