import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { 
    Input, 
    InputLabel, 
    Button,
    Box, 
    FormControl, 
    Alert } from '@mui/material'

const Login = (props) => {
    const initial = {
        username: "",
        password: ""}
    const [fields, setFields] = useState(initial)
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()
    const handleChange = (event) => {
        setFields({
          ...fields,
          [event.target.name]: event.target.value,
        })
      }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const res = await fetch("/login", {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(fields)
        })
        const data = await res.json()
        if (data.success) {
            props.handleAuth(true)
            props.setCurrentUser(data.user)
            navigate('/home')
        }
        else {
            setMessage(data.msg)
        }
    }

    return (
        <Box align = "center" sx={{justifyContent: "center"}}>
            <form onSubmit={handleSubmit}>
            <h3>Sign In</h3>
                <FormControl sx={{ marginBottom: 3}}>
                    <InputLabel htmlFor="username">Username: </InputLabel >
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
                    <InputLabel  htmlFor="password">Password: </InputLabel >
                    <Input 
                        type="password" 
                        value={fields.password} 
                        onChange={handleChange}
                        name="password"
                        required
                        />
                </FormControl>
                {message && <Alert sx={{width: "60%"}} mb={3} severity="warning">{message}</Alert>}
                <div className="login">
                    <Button type="submit" variant="contained">Login</Button>
                </div>
                <p className="forgot-password text-right">
                No account? <Link to="/register">Signup for free!</Link>
                </p>
            </form>
        </Box>
    )
}

export default Login