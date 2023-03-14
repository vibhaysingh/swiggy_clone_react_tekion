import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import ResturantDishes from "./components/resturantDishes/ResturantDishes";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";


function App() {


  return (
    <div>

      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resturants/:id" element={<ResturantDishes />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
