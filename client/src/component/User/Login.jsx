import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Input, InputLabel, Button, FormControl } from '@mui/material'

const Login = (props) => {
    const initial = {
        username: "",
        password: ""}
    const [fields, setFields] = useState(initial)
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
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <h3>Sign In</h3>
                <FormControl sx={{ marginBottom: 3}}>
                    <InputLabel htmlFor="username">Username: </InputLabel >
                    <Input 
                        type="text" 
                        value={fields.username} 
                        onChange={handleChange}
                        name="username"
                        />
                </FormControl>
                <br></br>
                <FormControl sx={{ marginBottom: 3}}>
                    <InputLabel  htmlFor="password">Password: </InputLabel >
                    <Input 
                        type="text" 
                        value={fields.password} 
                        onChange={handleChange}
                        name="password"
                        />
                </FormControl>
                <div className="login">
                    <Button type="submit" variant="contained">Login</Button>
                </div>
                <p className="forgot-password text-right">
                No account? <Link to="/register">Signup for free!</Link>
                </p>
            </form>
        </div>
    )
}

export default Login