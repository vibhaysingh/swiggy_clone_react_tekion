import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthNavbar from "./components/AuthNavbar/AuthNavbar";
import ResturantDishes from "./pages/RestaurantDishesPage/ResturantDishes";
import "./index.css";
import Homepage from "./pages/Homepage/Homepage";
import Cart from "./pages/CartPage/Cart";
import ConfirmedOrder from "./pages/OrderSummaryPage/ConfirmedOrder";
function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthNavbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/resturants/:id" element={<ResturantDishes />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orderConfirmed" element={<ConfirmedOrder/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
