import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useRouteMatch } from 'react-router';
import { UserContext } from '../../App';
const ReturnsAndOrders = () => {
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
        <div className="boxSizing">
            <h3 className="d-flex justify-content-center align-items-center">This component is under work</h3>
        </div>
    );
};

export default ReturnsAndOrders;