import { useState } from "react"
import { Input, InputLabel, Button, FormGroup, Container, MenuItem, Select } from '@mui/material'

const Home = () => {
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

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(fields)
    }

    return (
        <div>
            <h1>PICK ME A PLACE PLZ</h1>
            <form action="/home" method="post" onSubmit={handleSubmit}>
                <Container>
                <FormGroup sx={{ marginBottom: 3}}>
                    <InputLabel htmlFor="location">Location: </InputLabel>
                    <Select name="location" id="location-selector" onChange={handleChange}>
                        <MenuItem value="test">test</MenuItem>
                        <MenuItem value="home">home</MenuItem>
                        <MenuItem value="work">work</MenuItem>
                    </Select>
                </FormGroup>

                <FormGroup sx={{ marginBottom: 3}}>
                    <InputLabel htmlFor="criteria">Criteria: </InputLabel>
                    <Select name="criteria" id="criteria-selector" onChange={handleChange}>
                        <MenuItem value="search">search</MenuItem>
                    </Select>
                </FormGroup>

                <FormGroup sx={{ marginBottom: 3}}>
                    <InputLabel htmlFor="nearby-range">Within: </InputLabel>
                    <Input name="nearby-range" type="number" inputProps={{ min: 1, max: 30 }} onChange={handleChange}/><p>km</p>
                </FormGroup>

                <Button type="submit" variant="contained">SPIN</Button>
                </Container>
            </form>
        </div>
    )
}

export default Home