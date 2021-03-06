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
  return (
    // <UserContext.Provider value={[loggedAndSignedInUser, setLoggedAndSignedInUser]} className="boxSizing">
    <AuthProvider>
      <Router>
        <NavBar></NavBar>
        <Switch>
          <Route exact path="/">
            <Carousel></Carousel>
            <Shop></Shop>
          </Route>
          <Route exact path="/home">
            <Carousel></Carousel>
            <Shop></Shop>
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
          <PrivateRoute exact path="/dashboard">
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
          <Route exact path="/handleProduct/update/:id">
            <UpdateProducts></UpdateProducts>
          </Route>
          {/* <AdminRoute exact path="/makeAdmin">
            <MakeAdmin></MakeAdmin>
          </AdminRoute> */}
          <Route path="/dashboard/payment/:orderId">
            <Payment></Payment>
          </Route>
          {/* <AdminRoute exact path="/addDoctor">
            <AddProduct></AddProduct>
          </AdminRoute> */}
          <Route path="*">
            <Error></Error>
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
    // </UserContext.Provider>
  );
}

export default App;
