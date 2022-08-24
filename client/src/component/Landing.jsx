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
            <Typography variant="h3"sx={{fontFamily: 'Carter One'}}>Dine Roulette</Typography>
            <Box component="img"
                sx={{
                    height: 300,
                    width: 500
                    }}
                src={centerpiece}
                alt="Gacha-ify your meal" 
                />
            <Box sx={{width: "60%"}} mt={2} mb={3} size="small">
                <Typography variant="p" sx={{fontFamily: 'Comfortaa'}}>Can't decide on your next meal? You and your friends are split on where to go? This is for the times when you want to try something new, but can't decide</Typography>
            </Box>
            <Box>
                <Button variant="contained" onClick={()=>navigate("/login")}>Login</Button>
            </Box>
        </Box>
    )
} 

export default Landing