import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Input,
    Button, 
    FormGroup, 
    FormControl, 
    FormLabel,
    Container, 
    IconButton} from '@mui/material'

import trashIcon from '../../assets/remove-48.png';

import Autocomplete from "react-google-autocomplete";

const EditLocation = (props) => {
    const {allLocations, setAllLocations} = props
    const [address, setAddress] = useState(null);
    const GoogleApiKey = process.env.REACT_APP_GOOGLE
    const {locationID} = useParams()
    const showLocation = allLocations.find((deets) => {
        return parseInt(locationID) === deets.id
    })
    const initial = { 
        title: showLocation.title,
        address: showLocation.address,
        long: showLocation.long,
        lati: showLocation.lati
     }
    const [fields, setFields] = useState(initial)
    const navigate = useNavigate()

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
        const indexPosi = props.allLocations.indexOf(showLocation)
        let updatedForm = {...fields}
        if (fields.address === initial.address || fields.address === null) {
            updatedForm = {...fields, address: initial.address, noCall:true}
        }
        else {
            updatedForm = {...fields, noCall:false}
        }
        
        const res = await fetch(`/locations/${locationID}`, {
                method: 'PUT', 
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(updatedForm)
            })
        const data = await res.json();
        console.log(data)
            
        setAllLocations([...allLocations.slice(0, indexPosi), data, ...allLocations.slice(indexPosi+1)])
        navigate("/location")
    } 

    const types = ["street_address"]

    return (<div>
        <h1>Edit {showLocation.title}</h1>
        <Container>
        <IconButton ><img src={trashIcon}/></IconButton>
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
                        apiKey={GoogleApiKey}
                        options={{types}}
                        onChange={handleChange}
                        value={fields.address}
                        onPlaceSelected={(place) => {
                            setAddress(place.formatted_address)
                        }}
                        required/>
                    </div>
                </FormGroup>
            <Button type="submit" variant="contained">Update</Button>
        </FormControl>
        </form>
        </Container>
    </div>)
}

export default EditLocation