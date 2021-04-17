import Button from 'react-bootstrap/Button'
import { Link }from 'react-router-dom'


export default function ButtonCCInfo(props){
    
    const creditCardInfo = props.creditCardId

    console.log(`from ButtonCCinfo ${creditCardInfo}`)
    
    return(
        <div>
            <Link to={ {pathname: "credit-cards/show", state: {creditCardInfo} } } ><Button>More Details</Button></Link>
        </div>
    )
}