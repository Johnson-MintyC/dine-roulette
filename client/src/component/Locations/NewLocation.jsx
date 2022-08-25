import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Input,
    Button, 
    Box,
    FormGroup, 
    FormControl, 
    FormLabel,
    Container, 
    Typography} from '@mui/material'

import Autocomplete from "react-google-autocomplete";

import addresspin from "../../assets/address.png"
    
const NewLocation = (props) => {
    const initial = {
        title: "",
        address: "" 
    }
    const [fields, setFields] = useState(initial)
    const [address, setAddress] = useState(null);
    const GeoApiKey = process.env.REACT_APP_GEO_API
    const GoogleApiKey = process.env.REACT_APP_GOOGLE

    useEffect(() => {
        setFields({ ...fields, address: address });
      }, [address])

    //////////////////////////////////
    //  Colors Toggle
    //////////////////////////////////
    const { theTheme, purpTheme } = props
    const [ autoColor, setAutoColor] = useState({color: ""})

    useEffect (()=>{
        if (theTheme === purpTheme) {
            setAutoColor({color: "black"})
        }
        else {
            setAutoColor({color: "white"})
        }
    }, [theTheme])

    const navigate = useNavigate()

    const geofunc = () => {
        const locationsetter = async (x, y) => {
            const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${x}&lon=${y}&apiKey=${GeoApiKey}`
            const reponse = await fetch(url)
            const data = await reponse.json()
            setAddress(data.features[0].properties.formatted)
        }

        const success = (position) => {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
            locationsetter(latitude, longitude)
        }

        const error = () => {
            console.log("denied")
        }
        navigator.geolocation.getCurrentPosition(success, error)
    }

    const handleChange = (event) => {
        setFields({
            ...fields,
            [event.target.name]: event.target.value,
          })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const res = await fetch("/locations/new", {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(fields)
        })
        const data = await res.json()
        console.log(data)
        const updatedLocations = [...props.allLocations, {title: data.title,
        address: data.address, id:data.id, user_id:data.user_id}]
        props.setAllLocations(updatedLocations)
        navigate("/location")
    }   

    //Change Autocomplete fields, default on city
    const types = ["street_address"]

    return (
    <Box align="center">
        <Typography variant="h3">New Location</Typography>
        <Container>
        <form method="post" onSubmit={handleSubmit}>
            <FormControl>
                <FormGroup sx={{ marginBottom: 3}}>
                    
                    <FormLabel htmlFor="title">Title:</FormLabel>
                    <Input name="title" type="text" value={fields.title} onChange={handleChange} required/>
           
                </FormGroup>
                
                <FormGroup sx={{ marginBottom: 3}}>
                    <FormLabel htmlFor="address">Address:</FormLabel>
                    <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-colorPrimary MuiInputBase-formControl css-1i1ae5c-MuiInputBase-root-MuiInput-root">
                        <Autocomplete
                        className="MuiInputBase-input MuiInput-input css-1x51dt5-MuiInputBase-input-MuiInput-input"
                        name="address"
                        style={autoColor}
                        apiKey={GoogleApiKey}
                        options={{types}}
                        value={fields.address}
                        onPlaceSelected={(place) => {
                            setAddress(place.formatted_address)
                        }}
                        required/>
                        <img src={addresspin} onClick={geofunc}/>
                    </div>
                </FormGroup>
            <Button type="submit" variant="contained">Create</Button> 
        </FormControl>
        </form>
        </Container>
        
    </Box>)
}

export default NewLocation