import './App.css';
import Carousel from './Components/CarouselSlide/CarouselSlide';
import NavBar from './Components/NavBar/NavBar';
import Shop from './Components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route
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
import Payment from './Components/Payment/Payment';
import HandleProduct from './Components/Admin/HandleProduct';

export const UserContext = createContext();
function App(props) {
  const [loggedAndSignedInUser, setLoggedAndSignedInUser] = useState({});
  // loggedAndSignedInUser.lodded = true;
  // {loggedAndSignedInUser.lodded ? <p>Lodding.....</p> : 
  return (
    <UserContext.Provider value={[loggedAndSignedInUser, setLoggedAndSignedInUser]} className="boxSizing">
      <Router>
        <NavBar></NavBar>
        <Switch>
          <Route exact path="/">
            <Carousel></Carousel>
            <Shop></Shop>
          </Route>
          <Route path="/home">
            <Carousel></Carousel>
            <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
            <Buy></Buy>
          </Route>
          <Route path="/cart">
            <Cart></Cart>
          </Route>
          <Route path="/returnAndOrders">
            <ReturnsAndOrders></ReturnsAndOrders>
          </Route>
          <Route path="/customer-service">
            <CustomerService></CustomerService>
          </Route>
          <PrivateRoute path="/ordered">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path="/login">
            <SignUpAndSignIn></SignUpAndSignIn>
          </Route>
          <Route path="*">
            <Error></Error>
          </Route>
        </Switch>
      </Router>
      {/* <GoogleM></GoogleM> */}
      {/* <OriginToDestination></OriginToDestination> */}
      <ProductInsert></ProductInsert>
      <Payment></Payment>
      <HandleProduct></HandleProduct>
    </UserContext.Provider>
  );
}

export default App;
