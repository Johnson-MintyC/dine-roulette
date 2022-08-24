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

import ProtectedRoute from "./component/ProtectedRoute";

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

  /////////////////////////////////////////
  //  Auth Check
  ////////////////////////////////////////

  const loginCheck = async () => {
    const res = await fetch("/is-authenticated");
    const data = await res.json();
    setAuthorised(data.success);
    setCurrentUser(data.user);
  };

  useEffect(() => {
    loginCheck();
  }, []);

  const handleAuth = (authed) => {
    setAuthorised(authed);
  };

  ////////////////////////////////////////
  //  For locations
  ////////////////////////////////////////
  const [allLocations, setAllLocations] = useState(null);
  //Fetch just locations
  const locationFetch = async () => {
    const res = await fetch("/locations");
    const data = await res.json();
    console.log(data);
    setAllLocations(data);
  };

  useEffect(() => {
    if (authorised) {
      locationFetch();
    }
  }, [authorised]);

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
          {/* Home */}
          {allLocations && (
            <Route
              path="/home"
              element={
                <ProtectedRoute authorised={authorised}>
                  <Home allLocations={allLocations} />
                </ProtectedRoute>
              }
            />
          )}
          <Route
            path="/login"
            element={
              <Login setCurrentUser={setCurrentUser} handleAuth={handleAuth} />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                setCurrentUser={setCurrentUser}
                handleAuth={handleAuth}
              />
            }
          />
          {allLocations && (
            <Route
              path="/location"
              element={
                <ProtectedRoute authorised={authorised}>
                  <Location allLocations={allLocations} />
                </ProtectedRoute>
              }
            />
          )}
          {/* New Location Route */}
          <Route
            path="/location/new"
            element={
              <NewLocation
                allLocations={allLocations}
                setAllLocations={setAllLocations}
              />
            }
          />
          {allLocations ? (
            <Route
              path="/location/:locationID"
              element={
                <EditLocation
                  allLocations={allLocations}
                  setAllLocations={setAllLocations}
                />
              }
            />
          ) : (
            <></>
          )}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
