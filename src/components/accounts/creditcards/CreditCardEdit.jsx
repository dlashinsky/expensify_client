import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'

export default function CreditCardEdit(props){
    const location = useLocation()
    const creditCard = location.state.cardData
    console.log(creditCard)
    console.log(`👽👽👽👽👽👽👽👽`)


    
    const handleDelete = (e)  =>{
        e.preventDefault()
        console.log("here is the cardId", creditCard.id )
    }
    


    return(
        <div>
            <div>Hello From Edit Credit Card Page</div>
            

        
        </div>
    )
}