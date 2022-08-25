import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

import { Box, Card, CardActionArea, Typography } from "@mui/material"
import "./location.css"

const Location = (props) => {
    useEffect(()=>{

    }, [props.allLocations])

    const AllTheLocations = props.allLocations.map((locale) => {
            return (
            <Card sx={{ maxWidth: "20rem" }}>
                <Link to={`/location/${locale.id}`}>
                <CardActionArea>
                    <Typography variant="h3" color='inherit' className="location-entries">{locale.title}</Typography>
                </CardActionArea>   
                </Link>
            </Card>)
    })

    return (
    <Box align="center">
        <h1>Locations</h1>
        <Link to="/location/new"><h2>Add a Location</h2></Link>
        {AllTheLocations}
    </Box>
    )
}

export default Location