import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  createTheme,
  colors,
  ThemeProvider,
  Box,
  IconButton,
} from "@mui/material";
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

import Categories from "./component/Categories/Categories";

import Map from "./component/Map";

import ProtectedRoute from "./component/ProtectedRoute";
import ColorToggle from "./component/ColorToggle";

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

  const savedColor = () => {
    let colorcheck = localStorage.getItem("colorsetting");
    if (colorcheck) {
      setTheTheme(allTheThemes[colorcheck]);
    }
  };

  /////////////////////////////////////////
  //  ON boot check
  /////////////////////////////////////////

  useEffect(() => {
    loginCheck();
    savedColor();
    cataFetch();
  }, []);

  /////////////////////////////////////////
  //  Auth Check
  ////////////////////////////////////////

  const loginCheck = async () => {
    const res = await fetch("/is-authenticated");
    const data = await res.json();
    setAuthorised(data.success);
    setCurrentUser(data.user);
  };

  const handleAuth = (authed) => {
    setAuthorised(authed);
  };

  /////////////////////////////////////////
  //  On Auth Fetches
  /////////////////////////////////////////
  useEffect(() => {
    if (authorised) {
      locationFetch();
      queriesFetch();
    }
  }, [authorised]);

  ////////////////////////////////////////
  //  For locations
  ////////////////////////////////////////
  const [allLocations, setAllLocations] = useState(null);
  //Fetch just locations
  const locationFetch = async () => {
    const res = await fetch("/locations");
    const data = await res.json();
    setAllLocations(data);
  };

  /////////////////////////////////////////
  //  Map Data
  /////////////////////////////////////////
  const [mapCoords, setMapCoords] = useState({ lat: "", lng: "" });

  ////////////////////////////////////////
  //  Queries
  ////////////////////////////////////////
  const [userQueries, setUserQueries] = useState([]);
  const queriesFetch = async () => {
    const res = await fetch("/queries");
    const data = await res.json();
    setUserQueries(data);
  };

  ////////////////////////////////////////
  //  Categories Fetch
  ////////////////////////////////////////
  const [cataData, setCataData] = useState(null);
  const cataFetch = async () => {
    const res = await fetch("/categories");
    const data = await res.json();
    setCataData(data);
  };

  return (
    <ThemeProvider theme={theTheme}>
      <NavBar
        sx={{ bgcolor: "primary.main" }}
        authorised={authorised}
        setAuthorised={setAuthorised}
        setCurrentUser={setCurrentUser}
      />
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <ColorToggle
          theTheme={theTheme}
          setTheTheme={setTheTheme}
          purpTheme={purpTheme}
          darkTheme={darkTheme}
        />
      </Box>
      <CssBaseline />
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* Home */}

          <Route
            path="/home"
            element={
              <ProtectedRoute authorised={authorised}>
                {allLocations && (
                  <Home
                    allLocations={allLocations}
                    setMapCoords={setMapCoords}
                    mapCoords={mapCoords}
                    userQueries={userQueries}
                  />
                )}
              </ProtectedRoute>
            }
          />

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

          <Route
            path="/location"
            element={
              <ProtectedRoute authorised={authorised}>
                {allLocations && <Location allLocations={allLocations} />}
              </ProtectedRoute>
            }
          />

          {/* New Location Route */}
          <Route
            path="/location/new"
            element={
              <ProtectedRoute authorised={authorised}>
                <NewLocation
                  allLocations={allLocations}
                  setAllLocations={setAllLocations}
                  theTheme={theTheme}
                  purpTheme={purpTheme}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/location/:locationID"
            element={
              <ProtectedRoute authorised={authorised}>
                {allLocations && (
                  <EditLocation
                    allLocations={allLocations}
                    setAllLocations={setAllLocations}
                    theTheme={theTheme}
                    purpTheme={purpTheme}
                  />
                )}
              </ProtectedRoute>
            }
          />
          {mapCoords && (
            <Route path="/map" element={<Map mapCoords={mapCoords} />} />
          )}
          <Route
            path="/categories"
            element={
              <ProtectedRoute authorised={authorised}>
                {cataData && (
                  <Categories
                    cataData={cataData}
                    setUserQueries={setUserQueries}
                    userQueries={userQueries}
                  />
                )}
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
