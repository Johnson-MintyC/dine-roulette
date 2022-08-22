import { Routes, Route } from "react-router-dom";
import "./App.css";

import Landing from "./component/Landing";
import Home from "./component/Home";
import Login from "./component/User/Login";
import Register from "./component/User/Register";
import NavBar from "./component/NavBar";

import Location from "./component/Locations/Locations";
import NewLocation from "./component/Locations/NewLocation";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/location" element={<Location />} />
        <Route path="/newlocation" element={<NewLocation />} />
      </Routes>
    </div>
  );
}

export default App;
