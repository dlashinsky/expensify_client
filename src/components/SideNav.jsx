import { Link } from 'react-router-dom'



export default function SideNav(props){


    return(

        <div className= "SideNav-div">


            <Link to='/credit-cards'>
                <button
                   
                >Credit Cards</button>
            </Link>
            <Link to='/fixed-expenses'>
                <button>Fixed Expenses</button>
            </Link>
            <Link to='/variable-expenses'>
                <button>Variable Expenses</button>
            </Link>
            <Link to='/loans'>
                <button>Loans</button>
            </Link>
            <Link to='/savings'>
                <button>Savings</button>
            </Link>
           
        </div>
       

       
    )
}