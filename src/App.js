import { BrowserRouter, Route, Routes, useLocation, useParams } from "react-router-dom";
import AuthNavbar from "./components/AuthNavbar/AuthNavbar";
import ResturantDishes from "./pages/RestaurantDishesPage/ResturantDishes";
import "./index.css";
import Homepage from "./pages/Homepage/Homepage";
import Cart from "./pages/CartPage/Cart";
import ConfirmedOrder from "./pages/OrderConfirmedPage/ConfirmedOrder";
import { useDispatch} from "react-redux";
import { cartActions } from "./store/Toolkit/slices/cartSlice/cartSlice";
import axios from "axios";
import { useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { TransactionTokenContext } from "./store/Context/TransactionToken/TransactionToken";
import _ from 'lodash'


function App() {
  // const isLoggedIn = localStorage.getItem("currentUser");

  const {transactionToken,setTransactionToken}=useContext(TransactionTokenContext);
  
  const dispatch = useDispatch();
   const cartItemsFromLocalStorage = JSON.parse(localStorage.getItem('cartItems'));
   const totalQuantityFromLocalStorage = JSON.parse(localStorage.getItem('totalQuantity'));
   const totalCartpriceFromLocalStorage = JSON.parse(localStorage.getItem('totalCartprice'));
   const resturantIdFromLocalStorage = JSON.parse(localStorage.getItem('resturantId'));

   const initializeCart = () =>{
     
    const newItem = {
      cartItems: cartItemsFromLocalStorage,
      totalQuantity: totalQuantityFromLocalStorage,
      totalCartprice: totalCartpriceFromLocalStorage,
      resturantId:resturantIdFromLocalStorage

  };
  dispatch(cartActions.initCart(newItem));
  }

  initializeCart();

 



  return (
    <div>
      <BrowserRouter>
        <AuthNavbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/resturants/:id" element={<ResturantDishes />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orderConfirmed" element={<ConfirmedOrder />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


