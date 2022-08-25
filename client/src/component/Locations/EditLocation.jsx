import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Input, Box,
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
    
    const handleDelete = async () => {
        const res = await fetch(`/locations/${locationID}`, {
          method: "DELETE",
          header: `Content-Type: application/json`,
        });
        await res.json()
    
        const minusLocation = allLocations.filter((deets) => {
          return deets.id !== parseInt(locationID)
        })
        setAllLocations(minusLocation)
        navigate("/location")
      };

    const types = ["street_address"]

    return (
    <Box align="center" sx={{width: "100%"}}>
        <Box size='size' sx={{display: "flex", justifyContent: "center"}}>
            <h1>Edit {showLocation.title}</h1>
            <IconButton onClick={handleDelete}><img src={trashIcon}/></IconButton>
        </Box>
        <Container>
        <form method="post" onSubmit={handleSubmit}>
            <FormControl sx={{width: "70%"}}>
                <FormGroup sx={{ marginBottom: 5}}>
                
                    <FormLabel htmlFor="title">Title:</FormLabel>
                    <Input name="title" type="text" value={fields.title} onChange={handleChange} required/>
           
                </FormGroup>
                
                <FormGroup sx={{ marginBottom: 5}}>
                    <FormLabel htmlFor="address">Address:</FormLabel>
                    <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-colorPrimary MuiInputBase-formControl css-1i1ae5c-MuiInputBase-root-MuiInput-root">
                        <Autocomplete
                        className="MuiInputBase-input MuiInput-input css-1x51dt5-MuiInputBase-input-MuiInput-input"
                        name="address"
                        color={autoColor}
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
                <Box mt={3}>
                    <Button type="submit" variant="contained">Update</Button>
                </Box>
        </FormControl>
        </form>
        </Container>
    </Box>)
}

export default EditLocation