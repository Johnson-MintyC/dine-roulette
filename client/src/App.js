import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import { createTheme, colors, ThemeProvider } from "@mui/material";
import "./App.css";

import Landing from "./component/Landing";
import Home from "./component/Home";
import Login from "./component/User/Login";
import Register from "./component/User/Register";
import NavBar from "./component/NavBar";

import Location from "./component/Locations/Locations";
import NewLocation from "./component/Locations/NewLocation";
import EditLocation from "./component/Locations/EditLocation";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.deepPurple[300],
    },
  },
});
function App() {
  const [authorised, setAuthorised] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loginCheck = async () => {
      const res = await fetch("/is-authenticated");
      const data = await res.json();
      setAuthorised(data.success);
      setCurrentUser(data.user);
    };
    loginCheck();
  }, []);

  ////////////////////////////////////////
  //  For locations
  ////////////////////////////////////////
  const [allLocations, setAllLocations] = useState(null);
  //Fetch just locations
  const locationFetch = async () => {
    const res = await fetch("/locations");
    const data = await res.json();
    setAllLocations(data);
    console.log(data, "data");
    console.log(allLocations, "setter");
  };
  useEffect(() => locationFetch, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <NavBar
          sx={{ bgcolor: "primary.main" }}
          authorised={authorised}
          setAuthorised={setAuthorised}
          setCurrentUser={setCurrentUser}
        />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login
                setAuthorised={setAuthorised}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                setAuthorised={setAuthorised}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          {allLocations ? (
            <Route
              path="/location"
              element={<Location allLocations={allLocations} />}
            />
          ) : (
            <></>
          )}
          <Route path="/location/new" element={<NewLocation />} />
          <Route path="/location/:locationID" element={<EditLocation />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
