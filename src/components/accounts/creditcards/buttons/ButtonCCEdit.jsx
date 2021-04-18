import Button from 'react-bootstrap/Button'
import { Link }from 'react-router-dom'


export default function ButtonCCEdit(props){
    
    const cardData = props.creditCardData

    console.log(cardData)
    console.log("^^^^ from ButtonCCEdit")


    return(
        <div>
            
            <Link to={ {pathname: "/credit-cards/edit", state: {cardData} } } ><Button>Edit Card</Button></Link>
        </div>
    )
}