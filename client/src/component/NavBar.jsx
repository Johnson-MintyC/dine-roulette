import {
    AppBar, 
    Box, 
    Toolbar, 
    CssBaseline,
    Typography,
    IconButton,
    Stack,
    Button,
    Container,
    Menu,
    MenuItem
} from "@mui/material"

import { useState } from "react"

import MenuIcon from "../assets/burger-menu.svg"

import { Link, useNavigate } from "react-router-dom"
import rouletteicon from "../assets/roulette-iconp.png"
import "./NavBar.css";

const authpages = ["Locations", "Categories", "logout"]
const noauthpages = ["Locations", "Categories", "login"]

const NavBar = (props) => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        const res = await fetch("/logout", {
            method: "POST",
        })
        const data = await res.json()
        props.setAuthorised(false)
        props.setCurrentUser(null)
        navigate("/")
    }
    ////////////////////////////////////////
    //  burger drop down
    ////////////////////////////////////////
    const [anchorElNav, setAnchorElNav] = useState(null)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    return (
        <AppBar position="static" sx={{width: "100%"}}>
            <Toolbar>
                <IconButton size='medium' edge='start' color='inherit' aria-label='logo'>
                    <Link to="/home">
                        <img className="logo-img" src={rouletteicon} />
                    </Link>
                </IconButton>
                <Typography variant="h4" component='div' sx={{ flexGrow: 1, display:{xs:"none", sm:"block"}}}>
                    <Link className="home-text" to="/home">Dine Roulette</Link>
                </Typography>
                <Box sx={{flexGrow: 1, display: {xs: "flex", md: "none", justifyContent: "end"}}}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                            >
                    <img src={MenuIcon} />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                        >
                        {props.authorised ? 
                        <Stack direction='column' spacing={4}>
                            <Button color='inherit' onClick={()=>navigate('/location')}>Locations</Button>
                            <Button color='inherit' onClick={()=>navigate('/categories')}>Categories</Button>
                            <Button color='inherit' onClick={handleLogout}>Logout</Button>
                        </Stack>: 
                        <Stack direction='column' spacing={2} >
                            <Button color='inherit' onClick={()=>navigate('/login')}>Login</Button>
                        </Stack>}
                    </Menu>
                </Box>
                {props.authorised ? 
                <Stack direction='row' spacing={2} sx={{display: {xs: "none", md: "flex"}}}>
                    <Button color='inherit' onClick={()=>navigate('/location')}>Locations</Button>
                    <Button color='inherit' onClick={()=>navigate('/categories')}>Categories</Button>
                    <Button color='inherit' onClick={handleLogout}>Logout</Button>
                </Stack>: 
                <Stack direction='row' spacing={2} sx={{display: {xs: "none", md: "flex"}}}>
                    <Button color='inherit' onClick={()=>navigate('/login')}>Login</Button>
                </Stack>}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar