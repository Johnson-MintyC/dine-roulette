import { useState } from "react"
import { Input, 
    InputLabel, 
    Button, 
    FormGroup, 
    FormControl, 
    FormLabel,
    MenuItem, 
    Container,
    Select } from '@mui/material'

const Home = (props) => {
    /////////////////////////////////////////
    //  Fields Related
    ////////////////////////////////////////
    const initial = {
        location: "select",
        criteria: "select",

    }
    const [fields, setFields] = useState()

    const handleChange = (event) => {
        setFields({
          ...fields,
          [event.target.name]: event.target.value,
        })
      }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const res = await fetch("/api", {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(fields)
        })
        const queryData = await res.json()
        console.log(queryData)

    }
    //////////////////////////////////////////
    //  Location
    //////////////////////////////////////////
    const { allLocations } = props
    const menuifyLocations = allLocations.map((locale)=> {
        return (<MenuItem value={locale.id}>{locale.title}</MenuItem>)
    })
    
    ////////////////////////////////////////////
    //  On Spin
    ////////////////////////////////////////////
    const [queryReturn, setQueryReturn] = useState(null)


    
    return (
        <div>
            <h1>PICK ME A PLACE PLZ</h1>
            <form action="/home" method="post" onSubmit={handleSubmit}>
            <FormControl>
                <FormGroup sx={{ marginBottom: 3}}>
                    <FormControl>
                    <FormLabel htmlFor="location">Location: </FormLabel>
                    <Select name="location" id="location-selector" onChange={handleChange}>
                        {menuifyLocations}
                    </Select>
                    </FormControl>
                </FormGroup>

                <FormGroup sx={{ marginBottom: 3}}>
                <FormControl>
                    <FormLabel htmlFor="criteria">Criteria: </FormLabel>
                    <Select name="criteria" id="criteria-selector" onChange={handleChange}>
                        <MenuItem value="catering.restaurant">Restaurants</MenuItem>
                        <MenuItem value="catering.cafe">Coffee</MenuItem>
                        <MenuItem value="catering.bar,catering.pub">Bars and Pubs</MenuItem>
                    </Select>
                    </FormControl>
                </FormGroup>

                <FormGroup sx={{ marginBottom: 3}}>
                <FormControl>
                    <FormLabel htmlFor="nearby-range">Within: </FormLabel>
                    <Input name="nearby-range" type="number" min="1" max="30" onChange={handleChange}/><p>km</p>
                    </FormControl>
                </FormGroup>

                <Button type="submit" variant="contained">SPIN</Button>
                </FormControl>
            </form>
        </div>
    )
}

export default Home