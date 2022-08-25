import { Box, Checkbox, FormControl, FormControlLabel, FormGroup } from "@mui/material"
import { useState } from "react"



const Categories = () => {
    const [state, setState] = useState()
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(state)
    }
    
    const handleChange = (event) => {
        setState({
          ...state,
          [event.target.name]: event.target.checked,
        });
      };
    return (
        <Box>
            <h1>Caat load holder</h1>
            <form onSubmit={handleSubmit}>
            <h3>Select to add to your criteria search</h3>
        
                <FormGroup>
                <FormControlLabel
                    control={
                    <Checkbox onChange={handleChange} name="1"/>
                    }
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
                    
                </FormGroup>

            
            <Box>
            <button type="submit">Update</button>
            </Box>
            </form>
        </Box>
    )
}

export default Categories