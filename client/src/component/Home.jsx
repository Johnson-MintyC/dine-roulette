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
    const [fields, setFields] = useState(null)

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
        randomization(queryData)
    }

    ///////////////////////////////////////////
    //  Modal Popup
    ///////////////////////////////////////////
    const [open, setOpen] = useState(false)
    
    const randomization = (arr) => {
        const result = arr[Math.floor(Math.random()*arr.length)]
        setRestPick(result)
    }

    
    return (
        <Box align="center">
            <form action="/home" method="post" onSubmit={handleSubmit}>
            <Grid container maxWidth="md">
                <Grid item xs={12} sm={12} sx={{width: "100%"}}>
                <Typography variant="h3" sx={{ fontFamily: "Carter One"}}>PICK ME A PLACE PLZ</Typography>

                <FormControl sx={{width: "100%"}}>
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
                            <MenuItem value="restaurant">Restaurants</MenuItem>
                            <MenuItem value="cafe">Coffee</MenuItem>
                            <MenuItem value="bar">Bars</MenuItem>
                            <MenuItem value="pub">Pubs</MenuItem>
                        </Select>
                        </FormControl>
                    </FormGroup>

                    <FormGroup sx={{ marginBottom: 3}}>
                        <FormControl >
                        <FormLabel htmlFor="nearby-range">Within: </FormLabel>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Input name="nearby-range" type="number" min="1" max="30" onChange={handleChange}/><p> km</p>
                        </Box>
                        </FormControl>
                    </FormGroup>
                    <Box align="center">
                        <Button type="submit" variant="contained" onClick={(e)=>setOpen(true)}>SPIN</Button>
                    </Box>
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
                    <Box width={400} height={300} bgcolor="white" padding={3}>
                        {restPick && <Typography variant="h6" color="black">{restPick.name}</Typography>}
                        {restPick && <img src={restPick.icon}/>}
                        {restPick && <Typography color="black">Located at: <br></br>{restPick.vicinity}</Typography>}
                        {restPick && <Button onClick={()=>
                            randomization(queryReturn)
                        }>Spin Again</Button>}
                    </Box>
                </PopupModal>
        </Box>
    )
}

export default Home