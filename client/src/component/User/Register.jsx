import { useState } from "react"
import { useNavigate} from "react-router-dom"
import { Input, InputLabel, Button, FormControl, Alert, Container } from '@mui/material'

const Register = (props) => {
    const initial = {
        username: "",
        password: ""}
    const [fields, setFields] = useState(initial)
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const handleChange = (event) => {
        setFields({
          ...fields,
          [event.target.name]: event.target.value,
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        const res = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(fields)
        })
        const data = await res.json()
        if (data.success) {
            props.setAuthorised(true)
            props.setCurrentUser(data.user)
            navigate('/home')
        }
        else {
            setMessage(data.msg)
        }
    }
    return (
    <div>
        <form onSubmit={handleSubmit}>
        <h3>Register</h3>
            <FormControl sx={{ marginBottom: 3}}>
                <InputLabel htmlFor="username">Username: </InputLabel>
                <Input 
                    type="text" 
                    value={fields.username} 
                    onChange={handleChange}
                    name="username"
                    required
                    />
            </FormControl>
            <br></br>
            <FormControl sx={{ marginBottom: 3}}>
                <InputLabel htmlFor="password">Password: </InputLabel>
                <Input 
                    type="text" 
                    value={fields.password} 
                    onChange={handleChange}
                    name="password"
                    required
                    />               
            </FormControl>
            <Container>
            {message ? <Alert severity="info">{message}</Alert> : <p></p>}
            </Container>
            <div className="register">
                <Button type="submit" variant="contained">Register</Button>
            </div>
        </form>
    </div>)
}

export default Register