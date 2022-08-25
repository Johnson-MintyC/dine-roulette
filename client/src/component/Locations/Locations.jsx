import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import { Box, Card, CardActionArea, Typography } from "@mui/material"
import addicon from "../../assets/add-48.png"
import "./location.css"

const Location = (props) => {
    useEffect(()=>{

    }, [props.allLocations])

    const navigate = useNavigate()

    const AllTheLocations = props.allLocations.map((locale) => {
            return (
            <Card sx={{ maxWidth: "20rem" }}>

                <CardActionArea onClick={()=>navigate(`/location/${locale.id}`)} mb={2}>
                    <Typography variant="h3" color='inherit' className="location-entries">{locale.title}</Typography>
                </CardActionArea>   
            </Card>)
    })

    return (
    <Box align="center">
        <h1>Locations</h1>
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Box component="img" src={addicon}  sx={{height: "2rem", width: "2rem"}}/>
            <Link to="/location/new"><h2>Add a Location</h2></Link>
        </Box>
        {AllTheLocations}
    </Box>
    )
}

export default Location