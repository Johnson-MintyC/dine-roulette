import { useState, useEffect } from "react"
import { Input, 
    Box, 
    Button, 
    FormGroup, 
    FormControl, 
    FormLabel,
    Grid,
    MenuItem,
    Modal, 
    Container,
    styled,
    Select, 
    Typography} from '@mui/material'

const PopupModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
})

const Home = (props) => {
    /////////////////////////////////////////
    //  Fields Related
    ////////////////////////////////////////
    const [fields, setFields] = useState()

    const handleChange = (event) => {
        setFields({
          ...fields,
          [event.target.name]: event.target.value,
        })
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
    const [restPick, setRestPick] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault()
        const res = await fetch("/api", {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(fields)
        })
        const queryData = await res.json()
        console.log(queryData)
        setQueryReturn(queryData)
        setRestPick(randomization(queryData))
    }

    ///////////////////////////////////////////
    //  Modal Popup
    ///////////////////////////////////////////
    const [open, setOpen] = useState(false)
    
    const randomization = (arr) => {
        const result = arr[Math.floor(Math.random()*arr.length)]
        return result
    }

    
    return (
        <div>
            <form action="/home" method="post" onSubmit={handleSubmit}>
            <Grid container alignItems="center" justify="center" direction="column" maxWidth="md">
                <Grid item xs={12} sm={12}>
                <h1>PICK ME A PLACE PLZ</h1>

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
                        <Box sx={{ display: "flex" }}>
                        <Input name="nearby-range" type="number" min="1" max="30" onChange={handleChange}/><p> km</p>
                        </Box>
                        </FormControl>
                    </FormGroup>

                    <Button type="submit" variant="contained" onClick={(e)=>setOpen(true)}>SPIN</Button>
                    </FormControl>
                
                </Grid>
            </Grid>
            </form>
            <PopupModal
                open={open}
                onClose={e=>setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <Box width={400} hegith={200} bgcolor="white" padding={3}>
                        {restPick && <Typography variant="h6">{restPick.name}</Typography>}
                        {restPick && <Typography>Located at: <br></br>{restPick.vicinity}</Typography>}
                    </Box>
                </PopupModal>
        </div>
    )
}

export default Home