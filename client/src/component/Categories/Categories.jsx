import { Box, Checkbox, FormControl, FormControlLabel, FormGroup } from "@mui/material"
import { useState } from "react"



const Categories = () => {
    const [state, setState] = useState()
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(state)
        const cataids = []
        for (let key in state) {
            cataids.push(key)
        }
        const loopedcata = {...state, cataids}
        console.log(loopedcata)
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
        
                <FormGroup>
                <FormControlLabel
                    control={
                    <Checkbox onChange={handleChange} name="1" value="cafe&keyword=bubbletea"/>
                    }
                    sx={{justifyContent: "center"}}
                    label="Bubble Tea"/>
                    <FormControlLabel
                    control={
                    <Checkbox onChange={handleChange} name="2"/>
                    }
                    sx={{justifyContent: "center"}}
                    label="Pizza"/>
                    <FormControlLabel
                    control={
                    <Checkbox onChange={handleChange} name="3"/>
                    }
                    sx={{justifyContent: "center"}}
                    label="Dumplings"/>
                    
                </FormGroup>

            
            <Box>
            <button type="submit">Update</button>
            </Box>
            </form>
        </Box>
    )
}

export default Categories