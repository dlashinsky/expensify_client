import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function CreditCardEdit(props){
    const location = useLocation()
    const creditCard = location.state.cardData
    console.log(creditCard)
    console.log(`👽👽👽👽👽👽👽👽`)
    
    
    return(
        <div>Hello From Delete Credit Card Page</div>
    )
}