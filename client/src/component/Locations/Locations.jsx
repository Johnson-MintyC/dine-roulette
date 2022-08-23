import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

const Location = (props) => {
    console.log(props.allLocations)

    const AllTheLocations = props.allLocations.map((locale) => {
            return (<div>
                <h1>{locale.title}</h1>
            </div>)
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