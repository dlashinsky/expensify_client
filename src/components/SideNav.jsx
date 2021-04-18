import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'


export default function SideNav(props){


    return(

        <div className= "SideNav-div">

            
            <Link to='/credit-cards'><button>Credit Cards</button></Link>
            <Link to='/fixed-expenses'><button>Fixed Expenses</button></Link>
            <Link to='/variable-expenses'><button>Variable Expenses</button></Link>
            <Link to='/loans'><button>Loans</button></Link>
            <Link to='/savings'><button>Savings</button></Link>
           
        </div>
       
    
       
       )
    }
    
        // <Nav variant="tabs" defaultActiveKey="/credit-cards">
        //     <Nav.Item>
        //         <Nav.Link eventKey="link-1">  
        //             <Link to='/credit-cards'>Credit Cards</Link>
        //         </Nav.Link>
        //     </Nav.Item>

        //     <Nav.Item>
        //         <Nav.Link eventKey="link-2">
        //             <Link to='/fixed-expenses'>Fixed Expenses</Link>
        //         </Nav.Link>
        //     </Nav.Item>
            
        //     <Nav.Item>
        //         <Nav.Link eventKey="link-3">
        //             <Link to='/variable-expenses'>Variable Expenses</Link>
        //         </Nav.Link>
        //     </Nav.Item>
            
        //     <Nav.Item>
        //         <Nav.Link eventKey="link-4">
        //             <Link to='/loans'>Loans</Link>
        //         </Nav.Link>
        //     </Nav.Item>
            
        //     <Nav.Item>
        //         <Nav.Link eventKey="link-5">
        //             <Link to='/savings'>Savings</Link>
        //         </Nav.Link>
        //     </Nav.Item>
        // </Nav>