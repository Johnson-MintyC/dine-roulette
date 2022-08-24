import {
    AppBar, 
    Toolbar, 
    CssBaseline,
    Typography,
    IconButton,
    Stack,
    Button,
    Container
} from "@mui/material"

import { Link, useNavigate } from "react-router-dom"
import rouletteicon from "../assets/roulette-iconp.png"
import "./NavBar.css";

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

    return (
        <AppBar position="static">
            <Container>
            <Toolbar>
                <IconButton size='medium' edge='start' color='inherit' aria-label='logo'>
                    <Link to="/home">
                        <img className="logo-img" src={rouletteicon} />
                    </Link>
                </IconButton>
                <Typography variant="h4" component='div' sx={{ flexGrow: 1, display:{xs:"none", sm:"block"}}}>
                    <Link className="home-text" to="/home">Dine Roulette</Link>
                </Typography>
                {props.authorised ? 
                <Stack direction='row' spacing={2} >
                    <Button color='inherit' onClick={()=>navigate('/location')}>Locations</Button>
                    <Button color='inherit' onClick={()=>navigate('/categories')}>Categories</Button>
                    <Button color='inherit' onClick={handleLogout}>Logout</Button>
                </Stack>: 
                <Stack direction='row' spacing={2} >
                    <Button color='inherit' onClick={()=>navigate('/login')}>Login</Button>
                </Stack>}
            </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavBar