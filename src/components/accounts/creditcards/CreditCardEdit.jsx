import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'

export default function CreditCardEdit(props){
    const location = useLocation()
    const creditCard = location.state.cardData

    const [redirect, setRedirect] = useState(false)
    const [nickName, setNickName] = useState('')
    const [bankName, setBankName] = useState('')
    const [currentBal, setCurrentBal] = useState('')
    const [creditLimit, setCreditLimit] = useState('')
    const [minPayment, setMinPayment] = useState('')
    const [actualPayment, setActualPayment] = useState('')
    const [lastFourCard, setLastFourCard] = useState('')
    const [paymentDay, setPaymentDay] = useState('')

    const handleButton = (e) =>{
        e.preventDefault()
        console.log(creditCard)
    }

    


    return(
        <div>
            <div>Hello From Edit Credit Card Page is this working</div>
            
            <button>console.log</button>
        
        </div>
    )
}