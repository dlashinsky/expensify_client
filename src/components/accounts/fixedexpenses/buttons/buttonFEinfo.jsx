import Button from 'react-bootstrap/Button'
import { Link }from 'react-router-dom'


export default function ButtonFEinfo(props){
    
    const fixedExpenseInfo = props.fixedExpenseId

    console.log(`from ButtonFEinfo ${fixedExpenseInfo}`)
    
    return(
        <div>
            <Link to={ {pathname: "fixed-expenses/show", state: {fixedExpenseInfo} } } ><Button>More Details</Button></Link>
        </div>
    )
}