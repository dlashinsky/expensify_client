import { Link } from 'react-router-dom'


export default function Navbar(props){
    
    if(props.currentUser) {
        return(
            <div>
                <Link to='/'>
                    <span onClick = {props.handleLogout}>Logout</span>
                </Link>
    
                <Link to='/dashboard'>
                    Dashboard
                </Link>
            </div>
        )
    }
    
    
    
    
    return (
        <div>

            <Link to='/'>
                <h5>Home</h5>
            </Link>
            
            <Link to='/register'>
                Register
            </Link>
            <Link to='/login'>
                Login
            </Link>
            

        </div>
    )
}