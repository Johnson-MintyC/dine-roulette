import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

import { Card, CardActionArea, Typography } from "@mui/material"

const Location = (props) => {
    console.log(props.allLocations)

    const AllTheLocations = props.allLocations.map((locale) => {
            return (<Card sx={{ maxWidth: 345 }}>
                <Link to={`/location/${locale.id}`}>
                <CardActionArea>
                    <Typography variant="h3" color='inherit'>{locale.title}</Typography>
                </CardActionArea>   
                </Link>
            </Card>)
    })

    return (
    <div>
        <h1>Locations</h1>
        <Link to="/location/new"><h2>Add a Location</h2></Link>
        {AllTheLocations}
    </div>
    )
}

export default Location