import { useLocation } from "react-router-dom";
import "./App.css";
import AllRoutes from "./components/AllRoutes";
import Landing from "./components/landing/Landing";
import Navbar from "./components/navbar/Navbar";
import { Bounce, ToastContainer } from "react-toastify";


function App() {
  const location = useLocation();
  let isLogin = false;

  if (location.pathname == "/login" || location.pathname == "/signup") {
    isLogin = true;
  } else {
    isLogin = false;
  }

  return (
    <>
    
      {isLogin ? "" : <Navbar />}
      <AllRoutes />
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
