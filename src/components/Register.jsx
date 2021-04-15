import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Redirect } from 'react-router-dom'
import Dashboard from './Dashboard'

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
        <div>
            <h3>Register below</h3>
            <p>{message}</p>
            <form onSubmit={handleSubmit}>
                
                <label htmlFor="first-name">First Name:</label>
                <input 
                id="first-name"
                type='text'
                placeholder='John'
                onChange={e => setFirstName(e.target.value)}
                value={firstName}
                />

                <label htmlFor="last-name">Last Name:</label>
                <input 
                id="last-name"
                type='text'
                placeholder='Doe'
                onChange={e => setLastName(e.target.value)}
                value={lastName}
                />


                <label htmlFor="email-input">Email:</label>
                <input 
                id="email"
                type='email'
                placeholder='user@email.com'
                onChange={e => setEmail(e.target.value)}
                value={email}
                />

                <label htmlFor="password">Password:</label>
                <input 
                id="password"
                type='password'
                placeholder='enter password'
                onChange={e => setPassword(e.target.value)}
                value={password}
                />

                <input type="submit" value='Register'/>

            </form>
            
        </div>
    )
}