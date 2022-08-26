import React from 'react';
import { useRouteMatch } from 'react-router';
import Buy from '../Buy/Buy';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useEffect } from 'react';

const Cart = () => {
    let { path, url } = useRouteMatch();
    const [navBarAndFooter, setNavBarAndFooter] = useContext(UserContext);
    useEffect(() =>{
        if (path === "/returnAndOrders"){}{
          const changeState = { ...navBarAndFooter };
          changeState.navBar = true;
          changeState.footer = false;
          setNavBarAndFooter(changeState);
        }
    },[])
    return (
        <Buy></Buy>
    );
};

export default Cart;