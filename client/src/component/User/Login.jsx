import { useState } from "react"
import { Link } from "react-router-dom"
import { Input, InputLabel, Button, FormControl } from '@mui/material'

const Login = () => {
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

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("login")
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