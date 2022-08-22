import centerpiece from "../assets/gachapon-gashapon.gif"
import {Button} from "@mui/material"
import { useNavigate } from "react-router-dom"

const Landing = () => {
    const navigate = useNavigate()
    return (
        <div>
            <h1>Dine Roulette</h1>
            <img src={centerpiece} />
            <p>For the times when you want to try something new, but can't decide</p>
            <Button variant="contained" onClick={()=>navigate("/login")}>Login</Button>
        </div>
    )
} 

export default Landing