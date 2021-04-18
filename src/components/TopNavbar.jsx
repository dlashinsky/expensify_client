import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from 'react-bootstrap'

export default function TopNavbar(props){
    
    if(props.currentUser) {
        return(
            <Navbar expand="md" variant="dark" bg="dark">
                <Nav>
                    <Navbar.Brand>Expensify</Navbar.Brand>   
                    <Nav.Link>  <Link to='/' onClick={props.handleLogout}> Logout </Link>   </Nav.Link>
                    <Nav.Link>  <Link to='/dashboard'> Dashboard </Link>                    </Nav.Link>
                    
                </Nav>  
            </Navbar>
        )
    }
    
    return (
        <div>
            <Navbar  variant="dark" bg="dark">
                <Nav className="mr-auto">
                    <Navbar.Brand>Expensify</Navbar.Brand> 
                    <Nav.Link>  <Link to='/'> Home </Link>               </Nav.Link>
                    <Nav.Link>  <Link to='/register'> Register </Link>   </Nav.Link>
                    <Nav.Link>  <Link to='/login'> Login</Link>          </Nav.Link>
                </Nav>

            </Navbar>
            

        </div>
    )
}