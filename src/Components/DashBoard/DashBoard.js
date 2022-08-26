import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import DashBoardHome from './DashBoardHome';
import MakeAdmin from './MakeAdmin';
import AddProduct from './AddProduct';
import useAuth from '../Hook/useAuth';
import AdminRoute from '../PrivateRoute/AdminRoute';
import Payment from './Payment/Payment';
import { UserContext } from '../../App';
import { useContext } from 'react';

const drawerWidth = 200;

const DashBoard = (props) => {
    const [navBarAndFooter, setNavBarAndFooter] = useContext(UserContext);
    const handleDashBoardAndNavBarAndFooter = (e) => {
    }
    // let match = useRouteMatch();
    const { admin } = useAuth();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [valueDate, setValueDate] = useState(new Date());

    let { path, url } = useRouteMatch();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
        if (path === "/dashboard") {
            const changeState = { ...navBarAndFooter };
            changeState.navBar = false;
            changeState.footer = false;
            setNavBarAndFooter(changeState);
        }
    }, [])

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <Link to='/'><Button variant="inherit">Home</Button></Link>
            <br />
            <Link to={`${url}`}><Button variant="inherit">Dash Board</Button></Link>
            {
                admin && <>
                    <Link to={`${url}/admin`}><Button variant="inherit">Make Admin</Button></Link>
                    <Link to={`${url}/addProduct`}><Button variant="inherit">Add Product</Button></Link>
                </>
            }
            <Divider />
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Dash board
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar />
                    <Switch>
                        {/* 'dashboard/payment/:orderId' */}
                        <Route path={`${path}/admin`}>
                            <MakeAdmin />
                        </Route>
                        <AdminRoute path={`${path}/addProduct`}>
                            <AddProduct></AddProduct>
                        </AdminRoute>
                        <Route path={`${path}/payment/:orderId`}>
                            <Payment></Payment>
                        </Route>
                        <Route path={path}>
                            <DashBoardHome />
                        </Route>
                    </Switch>
                </Box>
            </Box>
        </div>
    );
};

DashBoard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default DashBoard;