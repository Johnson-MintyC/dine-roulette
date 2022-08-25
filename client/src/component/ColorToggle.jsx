import { IconButton } from "@mui/material";

import moonicon from "../assets/color-fogmoon.png"
import sunicon from "../assets/color-sun.svg"

const ColorToggle = (props) => {
    const { theTheme, setTheTheme, purpTheme, darkTheme } = props
    const toggleColors = () => {
        if (theTheme === purpTheme) {
          setTheTheme(darkTheme);
          localStorage.setItem("colorsetting", "darkTheme");
        } else {
          setTheTheme(purpTheme);
          localStorage.setItem("colorsetting", "purpTheme");
        }
      };
    return (
    <IconButton sx={{ ml: 1 }} onClick={toggleColors} color="inherit">
        {theTheme === purpTheme ?  <img src={moonicon} />: <img src={sunicon} />}
    </IconButton>)
}

export default ColorToggle