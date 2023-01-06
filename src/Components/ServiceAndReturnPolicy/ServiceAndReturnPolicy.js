import React, { useContext, useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { UserContext } from '../../App';

const Orders = () => {
    let { path, url } = useRouteMatch();
    const [navBarAndFooter, setNavBarAndFooter] = useContext(UserContext);
    useEffect(() => {
        if (path === "/serviceAndReturn") { } {
            const changeState = { ...navBarAndFooter };
            changeState.navBar = true;
            changeState.footer = false;
            setNavBarAndFooter(changeState);
        }
    }, [])
    return (
        <div>
            <div style={{ height: '20rem' }}>
            </div>
            <div>
                <div className='danger m-3 d-flex justify-content-center align-items-center fs-1'>
                    Service and return policy coming soon
                </div>
            </div>
        </div>
    );
};

export default Orders;