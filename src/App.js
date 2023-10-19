import { ToastContainer } from "react-toastify";
import "./App.css";
import Routing from "./router/Routing";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Routing />
    </>
  );
}

export default App;
