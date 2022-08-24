import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import { createTheme, colors, ThemeProvider, Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
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

const purpTheme = createTheme({
  palette: {
    primary: {
      main: colors.deepPurple[300],
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const allTheThemes = {
  purpTheme: purpTheme,
  darkTheme: darkTheme,
};

function App() {
  const [authorised, setAuthorised] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  /////////////////////////////////////////
  //  Colors Mode
  /////////////////////////////////////////
  const [theTheme, setTheTheme] = useState(purpTheme);

  const toggleColors = () => {
    if (theTheme === purpTheme) {
      setTheTheme(darkTheme);
      localStorage.setItem("colorsetting", "darkTheme");
    } else {
      setTheTheme(purpTheme);
      localStorage.setItem("colorsetting", "purpTheme");
    }
  };

  const savedColor = () => {
    let colorcheck = localStorage.getItem("colorsetting");
    if (colorcheck) {
      setTheTheme(allTheThemes[colorcheck]);
    }
  };

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
    savedColor();
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
    <ThemeProvider theme={theTheme}>
      <NavBar
        sx={{ bgcolor: "primary.main" }}
        authorised={authorised}
        setAuthorised={setAuthorised}
        setCurrentUser={setCurrentUser}
      />
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <button onClick={toggleColors}>Mode Toggle</button>
      </Box>
      <CssBaseline />
      <div className="App">
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
              <ProtectedRoute authorised={authorised}>
                <NewLocation
                  allLocations={allLocations}
                  setAllLocations={setAllLocations}
                />
              </ProtectedRoute>
            }
          />
          {allLocations ? (
            <Route
              path="/location/:locationID"
              element={
                <ProtectedRoute authorised={authorised}>
                  <EditLocation
                    allLocations={allLocations}
                    setAllLocations={setAllLocations}
                  />
                </ProtectedRoute>
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
