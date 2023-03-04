import { useState } from "react";
import Caraousel from "./components/Caraousel";
import CardContainer from "./components/CardContainer";
import FoodNavbar from "./components/FoodNavbar";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import "./index.css";


function App() {
  const [isLoginSidebarOpen, setIsLoginSidebarOpen] = useState(false);
  const [isSignupSidebarOpen, setIsSignupSidebarOpen] = useState(false);

  const handleLoginSidebarOpen = () => {
    document.body.classList.add("body-fixed");
    setIsLoginSidebarOpen(true);
  }
  const handleSignupSidebarOpen = () => {
    document.body.classList.add("body-fixed");
    setIsSignupSidebarOpen(true);
  }
  const handleLoginSidebarClose = () => {
    document.body.classList.remove("body-fixed");
    setIsLoginSidebarOpen(false);
  }
  const handleSignupSidebarClose = () => {
    document.body.classList.remove("body-fixed");
    setIsSignupSidebarOpen(false);
  }
  return (
    <div>
      <div className={(isLoginSidebarOpen || isSignupSidebarOpen) ? "overlay" : ''}></div>
      <Navbar handleLoginOpen={handleLoginSidebarOpen} handleSignupOpen={handleSignupSidebarOpen} />
      <Signup />
      <Login />
      <Login isOpen={isLoginSidebarOpen} isClose={handleLoginSidebarClose} />
      <Signup isOpen={isSignupSidebarOpen} isClose={handleSignupSidebarClose} />
      <Caraousel />
      <FoodNavbar />
      <CardContainer />

    </div>
  );
}

export default App;
