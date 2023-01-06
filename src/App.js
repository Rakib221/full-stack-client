import './App.css';
import Carousel from './Components/CarouselSlide/CarouselSlide';
import NavBar from './Components/NavBar/NavBar';
import Shop from './Components/Shop/Shop';
// import { Routes, Route, Link, Outlet } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import Buy from './Components/Buy/Buy';
import Error from './Components/Error/Error';
import Cart from './Components/Cart/Cart';
import ReturnsAndOrders from './Components/ReturnsAndOrders/ReturnsAndOrders';
import CustomerService from './Components/CustomerService/CustomerService';
import SignUpAndSignIn from './Components/Authentication/SignUpAndSignIn';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Shipment from './Components/Shipment/Shipment';
import GoogleM from './Components/GoogleM/GoogleM';
import GoogleMapDirec from './Components/GoogleM/GoogleMapDirec';
import OriginToDestination from './Components/GoogleM/OriginToDestination';
import ProductInsert from './Components/Admin/ProductInsert';
import HandleProduct from './Components/Admin/HandleProduct';
import UpdateProducts from './Components/Admin/UpdateProducts';
import Orders from './Components/Orders/Orders';
import AuthProvider from './Components/Context/AuthProvider';
import DashBoard from './Components/DashBoard/DashBoard';
import UserOrders from './Components/DashBoard/UserOrders';
import MakeAdmin from './Components/DashBoard/MakeAdmin';
import AdminRoute from './Components/PrivateRoute/AdminRoute';
import AddProduct from './Components/DashBoard/AddProduct';
import Payment from './Components/DashBoard/Payment/Payment';
import Home from './Components/Home/Home';
import DashBoardHome from './Components/DashBoard/DashBoardHome';
import ShopLocationAndRoute from './Components/GoogleM/ShopLocationAndRoute';
import useAuth from './Components/Hook/useAuth';
import Footer from './Components/Footer/Footer';
import ServiceAndReturnPolicy from './Components/ServiceAndReturnPolicy/ServiceAndReturnPolicy';
import { useEffect } from 'react';
import CookieConsent, { Cookies, getCookieConsentValue, resetCookieConsentValue } from "react-cookie-consent";

export const UserContext = createContext();
function App(props) {
  // const [user, setUser] = useState({
  //   newUser: false,
  //   isGoogleSignIn: false,
  //   isFacebookSignIn: false,
  //   isGithubSignIn: false,
  //   success: false,
  //   signUpSuccess: false,
  //   signInSuccess: false,
  //   name: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: false,
  //   error: '',
  //   alert: '',
  //   forgotPassword: false,
  //   accessToken:'',
  //   uid:''
  // });
  // const [loggedAndSignedInUser, setLoggedAndSignedInUser] = useState(user);
  // loggedAndSignedInUser.lodded = true;
  // {loggedAndSignedInUser.lodded ? <p>Lodding.....</p> : 
  const [navBarAndFooter, setNavBarAndFooter] = useState({
    navBar: true,
    footer: true,
  });

  const [enbaleStoringLoginData, setEnbaleStoringLoginData] = useState(false);

  return (
    <UserContext.Provider value={[navBarAndFooter, setNavBarAndFooter, enbaleStoringLoginData]}>
      <AuthProvider>
        {/* <Routes>
        <Route index element = {<Home/>} />
      </Routes> */}
        <Router>
          {/* {
            AuthProvider.navBar && <NavBar></NavBar>
          } */}
          {
            navBarAndFooter.navBar && <NavBar></NavBar>
          }

          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route exact path="/home">
              <Home></Home>
            </Route>
            <Route exact path="/product/:productKey">
              <Buy></Buy>
            </Route>
            <Route exact path="/cart">
              <Cart></Cart>
            </Route>
            <Route exact path="/returnAndOrders">
              <ReturnsAndOrders></ReturnsAndOrders>
            </Route>
            <Route exact path="/customer-service">
              <CustomerService></CustomerService>
            </Route>
            <PrivateRoute exact path="/ordered">
              <Shipment></Shipment>
            </PrivateRoute>
            <PrivateRoute exact path="/orders">
              <Orders></Orders>
            </PrivateRoute>
            <PrivateRoute path="/dashboard">
              <DashBoard></DashBoard>
            </PrivateRoute>
            <Route exact path="/login">
              <SignUpAndSignIn></SignUpAndSignIn>
            </Route>
            <Route exact path="/route">
              <GoogleMapDirec></GoogleMapDirec>
            </Route>
            <Route exact path="/productsInsert">
              <ProductInsert></ProductInsert>
            </Route>
            <Route exact path="/handleProduct">
              <HandleProduct></HandleProduct>
            </Route>
            <Route exact path="/map">
              <ShopLocationAndRoute></ShopLocationAndRoute>
            </Route>
            <Route exact path="/serviceAndReturn">
              <ServiceAndReturnPolicy></ServiceAndReturnPolicy>
            </Route>
            <Route exact path="/handleProduct/update/:id">
              <UpdateProducts></UpdateProducts>
            </Route>
            {/* <Route path="/dashboard/payment/:orderId">
            <Payment></Payment>
          </Route> */}
            <Route path="*">
              <Error></Error>
            </Route>
          </Switch>
        </Router>
        {
          navBarAndFooter.footer && <Footer></Footer>
        }
      </AuthProvider>
      <CookieConsent className="d-flex justify-content-center align-items-center" style={{ background: "#FF4C00",fontSize: "20px",height:"5rem" }} enableDeclineButton onDecline={() => {
          setEnbaleStoringLoginData(false);
      }} onAccept={(acceptedByScrolling) => {
        if (acceptedByScrolling) {
          // alert("Accept was triggered by user scrolling");
          setEnbaleStoringLoginData(true);
        } else {
          // alert("Accept was triggered by clicking the Accept button");
          setEnbaleStoringLoginData(true);
        }
      }}>This website uses cookies to enhance the user experience.</CookieConsent>
    </UserContext.Provider>
  );
}

export default App;
