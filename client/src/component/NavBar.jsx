import {
    AppBar, 
    Toolbar, 
    CssBaseline,
    Typography,
    Box
} from "@mui/material"

import { Link } from "react-router-dom"
import rouletteicon from "../assets/roulette-iconp.png"

const NavBar = () => {
    
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h4" className="Logo">
                <Link to="/home">
                <Box
                    component="img"
                    sx={{
                    height: 64,
                    }}
                    alt="Roulette logo."
                    src={rouletteicon}
                    />
                    </Link>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar