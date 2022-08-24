import centerpiece from "../assets/gashapon-gashapon-anime.gif"
import {
    Box, 
    Button,
    Typography
    } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Landing = () => {
    const navigate = useNavigate()
    return (
        <Box sx={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
            <Typography variant="h3">Dine Roulette</Typography>
            <Box component="img"
                sx={{
                    height: 300,
                    width: 500
                    }}
                src={centerpiece}
                alt="Gacha-ify your meal" 
                />
            <p>For the times when you want to try something new, but can't decide</p>
            <Box>
                <Button variant="contained" onClick={()=>navigate("/login")}>Login</Button>
            </Box>
        </Box>
    )
} 

export default Landing