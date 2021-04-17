import Button from 'react-bootstrap/Button'
import { Link }from 'react-router-dom'


export default function ButtonCCEdit(props){
    
    const cardData = props.creditCardData

    console.log(cardData)


    return(
        <div>
            
            <Link to={ {pathname: "testpath", state: {cardData} } } ><Button>Edit Card</Button></Link>
        </div>
    )
}