import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Redirect } from 'react-router-dom'
import Dashboard from './Dashboard'
import  Form  from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function Register(props){
    // some state for the controlled form
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    //state for a flash message
    const [message, setMessage] = useState('')

    //handle submit  to create a new user
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const requestBody = {
                email: email,
                password: password,
                last_name: lastName,
                first_name: firstName
            }
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/users`, requestBody)
            //axios POST call to create a new user in the database
            if(response.data.token){
                const { token } = response.data 
                //Set token to local storage
                localStorage.setItem('jwtToken', token)
                //decode and set user to the state
                const decoded = jwt_decode(token)
                props.setCurrentUser(decoded)
            }else if(response.data.message){
                setMessage(response.data.message)
            }

        } catch (error) {
            console.log(error)
        }
        
    }
    
    //redirect if the user is logged in 
    if(props.currentUser) return <Redirect to='/dashboard' component={ Dashboard } currentUser={props.currentUser}/>

    return (
        <div className="Register-div">
            <h3>We're happy to have you.</h3>
            <p>{message}</p>
            <p>Create an account below!</p>
           <div>     
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId= "formBasicEmail"> 
                        {/* <Form.Label htmlFor="email">Email:</Form.Label> */}
                        <Form.Control value={email} type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
                        <Form.Text className="text-muted">Rest assured your data is safe. We don't share personal info.</Form.Text>
                    </Form.Group>
                    
                    <Form.Group controlId= "formBasicPassword"> 
                        {/* <Form.Label htmlFor="password">Password:</Form.Label> */}
                        <Form.Control value={password} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                        <Form.Text className="text-muted">Please enter a secure password.</Form.Text>
                    </Form.Group>
                    
                    <Form.Group > 
                        {/* <Form.Label htmlFor="first-name">First Name:</Form.Label> */}
                        <Form.Control value={firstName} type="text" placeholder="John" onChange={e => setFirstName(e.target.value)}/>
                        <Form.Text className="text-muted">Your first name goes here.</Form.Text>
                    </Form.Group>
                    
                    <Form.Group > 
                        {/* <Form.Label htmlFor="last-name">Last Name:</Form.Label> */}
                        <Form.Control value={lastName} type="text" placeholder="Doe" onChange={e => setLastName(e.target.value)}/>
                        <Form.Text className="text-muted">Last name, please.</Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit">Join ExSpend!</Button>
                </Form>
            </div>
        </div>
    )
}

            {/* <label htmlFor="last-name">Last Name:</label>
            <input 
            id="last-name"
            type='text'
            placeholder='Doe'
            onChange={e => setLastName(e.target.value)}
            value={lastName}
            />

            <input 
            id="first-name"
            type='text'
            placeholder='John'
            onChange={e => setFirstName(e.target.value)}
            value={firstName}
            />

            <label htmlFor="password">Password:</label>
            <input 
            id="password"
            type='password'
            placeholder='enter password'
            onChange={e => setPassword(e.target.value)}
            value={password}
            />


            <label htmlFor="email-input">Email:</label>
            <input 
            id="email"
            type='email'
            placeholder='user@email.com'
            onChange={e => setEmail(e.target.value)}
            value={email}
            />

            <input type="submit" value='Register'/> */}