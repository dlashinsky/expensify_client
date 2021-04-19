import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Redirect } from 'react-router-dom'
import Dashboard from './Dashboard'
import  Form  from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function Login(props){

    // app state for controlled form 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Back end error message if login issues
    const [message, setMessage] = useState('')

    // handle submit button for the form

    const handleSubmit = async (e) =>{
        try {
            //post to back end and hit login route
            e.preventDefault()
            const requestBody = {
                email: email,
                password: password
            }
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/login`, requestBody)
            //save the JWT to local storage
            if(response.data.token){
                const { token } = response.data
                localStorage.setItem('jwtToken', token)
                //decode JWT and set the app state to the JWT payload (user info)
                const decoded = jwt_decode(token)
                // console.log(decoded)
                props.setCurrentUser(decoded)
            }else if(response.data.message){
                setMessage(response.data.message)
            }
            
            
        } catch (error) {
            console.log(error)   
            // if login fails desplay 404 error from the backend 
            if(error.response.status === 400) {

            }else{
                console.error(error)
            }
        }
    }
    console.log(props.currentUser)
    //if check to see if the user is logged in, redirect to the DASHBOARD 
    if(props.currentUser) return <Redirect to='/dashboard' component={ Dashboard } currentUser= { props.currentUser }/>

    return (
    
            <div>
                <h3>Welcome Back.</h3>

                <p>{message}</p>
                
                
                <Form onSubmit={handleSubmit}>

                    <Form.Group controlId= "formBasicEmail"> 
                        {/* <Form.Label htmlFor="email">Email:</Form.Label> */}
                        <Form.Control value={email} type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
                        <Form.Text className="text-muted">Enter your email</Form.Text>
                    </Form.Group>
                    
                    <Form.Group controlId= "formBasicPassword"> 
                        {/* <Form.Label htmlFor="password">Password:</Form.Label> */}
                        <Form.Control value={password} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                        <Form.Text className="text-muted">Enter your password</Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit">Login</Button>

                </Form>


            </div>
    )   
}
                // <form onSubmit={handleSubmit}>

                //     <label htmlFor="email-input">Email:</label>

                //         <input 
                //         id="email"
                //         type='email'
                //         placeholder='user@email.com'
                //         onChange={e => setEmail(e.target.value)}
                //         value={email}
                //         />
                //         <label htmlFor="password">Password:</label>
                //         <input 
                //         id="password"
                //         type='password'
                //         placeholder='enter password'
                //         onChange={e => setPassword(e.target.value)}
                //         value={password}
                //         />

                //         <input type="submit" value='login'/>

                // </form>