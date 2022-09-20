import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Input, 
    Box, 
    Button, 
    FormGroup, 
    FormControl, 
    FormLabel,
    Grid,
    MenuItem,
    Modal, 
    Container,
    styled,
    Select, 
    Typography} from '@mui/material'

import addresspin from "../assets/address.png"

const PopupModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
})

const Home = (props) => {
    /////////////////////////////////////////
    //  Fields Related
    ////////////////////////////////////////
    const [fields, setFields] = useState(null)

    const handleChange = (event) => {
        setFields({
          ...fields,
          [event.target.name]: event.target.value,
        })
      }

    //////////////////////////////////////////
    //  Location
    //////////////////////////////////////////
    const { allLocations } = props
    const menuifyLocations = allLocations.map((locale)=> {
        return (<MenuItem value={locale.id}>{locale.title}</MenuItem>)
    })

    //////////////////////////////
    //  Queires
    //////////////////////////////
    const extraCrits = props.userQueries.map((query)=>{
        return (<MenuItem value={query.text}>{query.title}</MenuItem>)
    })
    
    ////////////////////////////////////////////
    //  On Spin
    ////////////////////////////////////////////
    const [queryReturn, setQueryReturn] = useState(null)
    const [restPick, setRestPick] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(fields)
        const res = await fetch("/api", {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(fields)
        })
        const queryData = await res.json()
        setQueryReturn(queryData)
        randomization(queryData)
    }

    ///////////////////////////////////////////
    //  Modal Popup
    ///////////////////////////////////////////
    const [open, setOpen] = useState(false)
    
    const randomization = (arr) => {
        const result = arr[Math.floor(Math.random()*arr.length)]
        if (!result.opening_hours) {
            result.opening_hours = {open_now: false}
        }
        console.log(result.opening_hours)
        setRestPick(result)
        props.setMapCoords(result)
    }

    /////////////////////////////////////////////
    //  Current Location
    /////////////////////////////////////////////
    // const [currentLocale, setCurrentLocale] = useState()
    // const GeoApiKey = process.env.REACT_APP_GEO_API

    // const geofunc = () => {
    //     const locationsetter = async (x, y) => {
    //         const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${x}&lon=${y}&apiKey=${GeoApiKey}`
    //         const reponse = await fetch(url)
    //         const data = await reponse.json()
    //         setCurrentLocale(data.features[0].properties.formatted)
    //     }

    //     const success = (position) => {
    //         const latitude = position.coords.latitude
    //         const longitude = position.coords.longitude
    //         locationsetter(latitude, longitude)
    //     }

    //     const error = () => {
    //         console.log("denied")
    //     }
    //     navigator.geolocation.getCurrentPosition(success, error)
    // }

    const navigate = useNavigate()

    return (
        <Box align="center">
            <form action="/home" method="post" onSubmit={handleSubmit}>
            <Grid container maxWidth="md">
                <Grid item xs={12} sm={12} sx={{width: "100%"}}>
                <Typography variant="h3" mb={3} sx={{ fontFamily: "Carter One"}}>PICK ME A PLACE PLZ</Typography>

                <FormControl sx={{width: "80%"}}>
                    <FormGroup sx={{ marginBottom: 3}}>
                        <FormControl>
                        <FormLabel htmlFor="location">Location: <Box component="img" src={addresspin} sx={{height: "2rem", width: "2rem"}}/></FormLabel>
                        <Select name="location" id="location-selector" onChange={handleChange} required>
                            <MenuItem value="" disabled selected hidden>Select your option</MenuItem>
                            {menuifyLocations}
                        </Select>
                        </FormControl>
                    </FormGroup>

                    <FormGroup sx={{ marginBottom: 4}}>
                    <FormControl>
                        <FormLabel htmlFor="criteria">Criteria: </FormLabel>
                        <Select name="criteria" id="criteria-selector" onChange={handleChange} required>
                            <MenuItem value="restaurant">Restaurants</MenuItem>
                            <MenuItem value="cafe">Coffee</MenuItem>
                            <MenuItem value="bar">Bars</MenuItem>
                            <MenuItem value="pub">Pubs</MenuItem>
                            {extraCrits}
                        </Select>
                        </FormControl>
                    </FormGroup>

                    <FormGroup sx={{ marginBottom: 4}}>
                        <FormControl >
                        <FormLabel htmlFor="nearby-range">Within: </FormLabel>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Input name="nearby-range" type="number" min="1" max="30" onChange={handleChange} required/><p> km</p>
                        </Box>
                        </FormControl>
                    </FormGroup>
                    <Box align="center">
                        <Button type="submit" variant="contained" onClick={(e)=>setOpen(true)}>SPIN</Button>
                    </Box>
                    </FormControl>
                
                </Grid>
            </Grid>
            </form>
            {restPick && <PopupModal
                open={open}
                onClose={e=>setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <Box width={450} height={370} bgcolor="white" padding={3} align="center">
                        <Typography variant="h6" color="black">{restPick.name}</Typography>
                        <img className="queryImage" src={`https://maps.googleapis.com/maps/api/place/photo?maxheight=200&photo_reference=${restPick.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE}`}/>
                        {restPick.opening_hours.open_now ? (<Typography color="black">We're currently: <br></br>Open</Typography>): (<Typography color="black">We're currently: <br></br>Closed</Typography>)}
                        <Typography variant="p" color="black">Rated: {restPick.rating}</Typography>
                        <Box sx={{display: "flex", justifyContent: "space-around"}}>
                        <Button onClick={()=>
                            randomization(queryReturn)
                        }>Spin Again</Button>
                        <Button onClick={()=>
                        navigate("/map")}>Map</Button>
                        </Box>
                    </Box>
                </PopupModal>}
        </Box>
    )
}

export default Home