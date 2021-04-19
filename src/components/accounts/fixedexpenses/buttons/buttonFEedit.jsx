import Button from 'react-bootstrap/Button'
import { Link }from 'react-router-dom'


export default function ButtonFEedit(props){
    
    const fixedExpenseData = props.fixedExpenseInfo

    console.log(`from ButtonFEinfo ${fixedExpenseData}`)
    
    return(
        <div>
            <Link to={ {pathname: "fixed-expenses/edit", state: {fixedExpenseData} } } ><Button>Edit Expense</Button></Link>
        </div>
    )
}