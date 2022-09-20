import { Box, Button, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { useState } from "react"
import { useNavigate} from "react-router-dom"



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
        navigate('/home')

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
            <Typography variant="h3" sx={{fontFamily: 'Comfortaa'}}>Categories </Typography>
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
                        <Checkbox onChange={handleChange} name="4"/>
                        }
                        label="Dessert"/>
                        <FormControlLabel
                    control={
                        <Checkbox onChange={handleChange} name="5"/>
                        }
                        label="Noodles"/>
                        <FormControlLabel
                    control={
                        <Checkbox onChange={handleChange} name="6"/>
                        }
                        label="Burgers"/>
                        <FormControlLabel
                    control={
                        <Checkbox onChange={handleChange} name="7"/>
                        }
                        label="Fried Chicken"/>
                        <FormControlLabel
                    control={
                        <Checkbox onChange={handleChange} name="8"/>
                        }
                        label="Pasta"/>
                    
                </FormGroup>

                <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox onChange={handleChange} name="9"/>
                        }
                        label="Indian"/>
                <FormControlLabel
                    control={
                        <Checkbox onChange={handleChange} name="10"/>
                        }
                        label="Thai"/>
                <FormControlLabel
                    control={
                        <Checkbox onChange={handleChange} name="11"/>
                        }
                        label="Vietnamese"/>
                <FormControlLabel
                    control={
                        <Checkbox onChange={handleChange} name="12"/>
                        }
                        label="Korean"/>
                <FormControlLabel
                    control={
                        <Checkbox onChange={handleChange} name="13"/>
                        }
                        label="Breakfast"/>
                <FormControlLabel
                    control={
                        <Checkbox onChange={handleChange} name="14"/>
                        }
                        label="Mexican"/>
                <FormControlLabel
                    control={
                        <Checkbox onChange={handleChange} name="15"/>
                        }
                        label="Middle Eastern"/>
                <FormControlLabel
                    control={
                        <Checkbox onChange={handleChange} name="16"/>
                        }
                        label="Fast Food"/>
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