import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import ResturantDishes from "./components/resturantDishes/ResturantDishes";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";


function App() {


  return (
    <div>

      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants/:id" element={<ResturantDishes />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
