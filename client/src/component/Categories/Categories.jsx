import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup } from "@mui/material"
import { Container } from "@mui/system"
import { useState } from "react"
import { useNavigate } from "react-router-dom"



const Categories = (props) => {
    const [state, setState] = useState()
    const { userQueries, setUserQueries } = props
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(state)
        const cataids = []
        for (let key in state) {
            cataids.push(key)
        }
        const addedCrits = cataids.map((id) => {
            for (let data of props.cataData ) {
                if (data.id === parseInt(id)) {
                return data
                }
            }
        })
        const updatedQ = [...userQueries, ...addedCrits]
        setUserQueries(updatedQ)
        console.log(updatedQ)
        const loopedcata = {...state, cataids}
        console.log(loopedcata)
        //


        const res = await fetch("/queries/new", {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(loopedcata)
        })
        const data = await res.json()
    }
    
    const handleChange = (event) => {
        setState({
          ...state,
          [event.target.name]: event.target.checked,
        });
      };
    return (
        <Box align="center">
            <h1>Categories </h1>
            <form onSubmit={handleSubmit}>
            <h3>Select to add to your criteria search</h3>
            <Container sx={{display: "flex", justifyContent: "space-around"}}>
                <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox onChange={handleChange} name="1" value="cafe&keyword=bubbletea"/>
                        }
                        htmlFor="1"
                        label="Bubble Tea"/>
                    <FormControlLabel
                    control={
                        <Checkbox onChange={handleChange} name="2"/>
                        }
                        label="Pizza"/>
                    <FormControlLabel
                    control={
                        <Checkbox onChange={handleChange} name="3"/>
                        }
                        label="Dumplings"/>
                    {/* breakpoint */}
                    <FormControlLabel
                    control={
                        <Checkbox onChange={handleChange} name="4" value=""/>
                        }
                        label="Curry"/>
                        <FormControlLabel
                    control={
                        <Checkbox onChange={handleChange} name="5" value=""/>
                        }
                        label="Noodles"/>
                        <FormControlLabel
                    control={
                        <Checkbox onChange={handleChange} name="6" value=""/>
                        }
                        label="Alcohol"/>
                        <FormControlLabel
                    control={
                        <Checkbox onChange={handleChange} name="7" value=""/>
                        }
                        label="Burger"/>
                        <FormControlLabel
                    control={
                        <Checkbox onChange={handleChange} name="8" value=""/>
                        }
                        label="Chicken"/>
                    
                </FormGroup>

                <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox onChange={handleChange} name="1" value="cafe&keyword=bubbletea"/>
                        }
                        label="Pasta"/>
                </FormGroup>
                </Container>

            
            <Box mt={4}>
                <Button variant="contained" type="submit">Update</Button>
            </Box>
            </form>
        </Box>
    )
}

export default Categories