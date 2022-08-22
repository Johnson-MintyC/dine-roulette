import {
    AppBar, 
    Toolbar, 
    CssBaseline,
    Typography,
    IconButton,
    Stack,
    Button
} from "@mui/material"

import { Link } from "react-router-dom"
import rouletteicon from "../assets/roulette-iconp.png"
import "./NavBar.css";

const NavBar = () => {
    
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton size='medium' edge='start' color='inherit' aria-logo='logo'>
                    <Link to="/home">
                        <img className="logo-img" src={rouletteicon} />
                    </Link>
                </IconButton>
                <Typography variant="h4" component='div' sx={{ flexGrow: 1 }}>
                    <Link to="/home">Dine Roulette</Link>
                </Typography>
                <Stack direction='row' spacing={2} >
                    <Button color='inherit'>Location</Button>
                    <Button color='inherit'>Categories</Button>
                    <Button color='inherit'>Login</Button>
                </Stack>
                
            </Toolbar>
        </AppBar>
    )
}

export default NavBar