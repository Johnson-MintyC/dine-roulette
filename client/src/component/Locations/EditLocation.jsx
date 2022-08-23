import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Input,
    Button, 
    FormGroup, 
    FormControl, 
    FormLabel,
    Container } from '@mui/material'

import Autocomplete from "react-google-autocomplete";

const EditLocation = (props) => {
    const [address, setAddress] = useState(null);
    const GoogleApiKey = process.env.REACT_APP_GOOGLE
    const {locationID} = useParams()
    const showLocation = props.allLocations.find((deets) => {
        return parseInt(locationID) === deets.id
    })
    const initial = { 
        title: showLocation.title,
        address: showLocation.address,
        long: showLocation.long,
        lati: showLocation.lati
     }
    const [fields, setFields] = useState(initial)

    useEffect(() => {
        setFields({ ...fields, address: address });
      }, [address])

    const handleChange = (event) => {
        setFields({
            ...fields,
            [event.target.name]: event.target.value,
          })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(fields)
        // const res = await fetch("/locations/new", {
        //     method: 'POST', 
        //     headers: { 'Content-Type': 'application/json'},
        //     body: JSON.stringify(fields)
        // })
        // const data = await res.json()
        // console.log(data)
        // const updatedLocations = [...props.allLocations, {title: data.title,
        // address: data.address, id:data.id, user_id:data.user_id}]
        // props.setAllLocations(updatedLocations)
        // navigate("/location")
    } 

    const types = ["street_address"]

    return (<div>
        <h1>Edit {showLocation.title}</h1>
        <Container>
        <form method="post" onSubmit={handleSubmit}>
            <FormControl>
                <FormGroup sx={{ marginBottom: 3}}>
                
                    <FormLabel htmlFor="title">Title:</FormLabel>
                    <Input name="title" type="text" value={fields.title} onChange={handleChange}/>
           
                </FormGroup>
                
                <FormGroup sx={{ marginBottom: 3}}>
                    <FormLabel htmlFor="address">Address:</FormLabel>
                    <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-colorPrimary MuiInputBase-formControl css-1i1ae5c-MuiInputBase-root-MuiInput-root">
                        <Autocomplete
                        className="MuiInputBase-input MuiInput-input css-1x51dt5-MuiInputBase-input-MuiInput-input"
                        name="address"
                        apiKey={GoogleApiKey}
                        options={{types}}
                        onChange={handleChange}
                        value={fields.address}
                        onPlaceSelected={(place) => {
                            setAddress(place.formatted_address)
                        }}/>
                    </div>
                </FormGroup>
            <Button type="submit" variant="contained">Update</Button> 
        </FormControl>
        </form>
        </Container>
    </div>)
}

export default EditLocation