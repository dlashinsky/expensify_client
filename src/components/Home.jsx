import logo from '../images/exspend-logo.png'
import backgroundPic from '../images/background-img.jpg'
import Register from './Register'
import { useState }  from 'react'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router'
export default function Home(props){
    
    const [userClick, setUserClick] = useState(false)


    const handleClick = (e) =>{
        e.preventDefault()
        setUserClick(true)
    }
    
    if(userClick) return <Redirect to="/register"></Redirect>

    
    return (
        <div> 
                <div className="home-container-div">
                    
                    <div className="logo-signup-div">
                
                        <div className="home-logo-signup">

                            {/* <h1>Welcome to ExSpend!</h1> */}
                            <img src={logo} alt="No Image available"/>

                            <Button onClick={handleClick}>Sign Up</Button> 
                            
                        </div>

                    </div>

                        
                        <div className="home-image-div">
                        
                           
                        </div>


                       
                </div>

        </div>
    )
}