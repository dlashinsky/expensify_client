import { useLocation, Redirect } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

export default function CreditCardEdit(props){

    const location = useLocation()
    const creditCard = location.state.cardData


    const [edited, setEdited] = useState(false)
    const [nickName, setNickName] = useState('')
    const [bankName, setBankName] = useState('')
    const [currentBal, setCurrentBal] = useState('')
    const [creditLimit, setCreditLimit] = useState('')
    const [minPayment, setMinPayment] = useState('')
    const [actualPayment, setActualPayment] = useState('')
    const [lastFourCard, setLastFourCard] = useState('')
    const [paymentDay, setPaymentDay] = useState('')

useEffect(()=>{
    setNickName(creditCard.attributes.nick_name)
    setBankName(creditCard.attributes.bank_name)
    setCurrentBal(creditCard.attributes.current_bal)
    setCreditLimit(creditCard.attributes.credit_limit)
    setMinPayment(creditCard.attributes.min_payment)
    setActualPayment(creditCard.attributes.actual_payment)
    setLastFourCard(creditCard.attributes.last_four_card)
    setPaymentDay(creditCard.attributes.payment_day)

},[])


    const handleEditCreditCard = async (e) =>{
        try {
            e.preventDefault()
            
            const requestBody = {
                nick_name: nickName,
                bank_name: bankName,
                current_bal: currentBal,
                credit_limit: creditLimit,
                min_payment: minPayment,
                actual_payment: actualPayment,
                last_four_card: lastFourCard,
                payment_day: paymentDay,
            }

            const token = localStorage.getItem('jwtToken')
            const authHeaders = {
                'Authorization': `Bearer ${token}`
            }   
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/v1/creditcards/${creditCard.id}`, requestBody, { headers: authHeaders })
            console.log(response)
            setEdited(true)
        } catch (error) {
            console.log(error)
        }
    }

    if(edited) return <Redirect to='/credit-cards'/>

    const handleNickName = (e) =>{
        if(e.target.value) {
            setNickName(e.target.value)
        }
    }
    const handleBankName = (e) =>{
        if(e.target.value) {
            setBankName(e.target.value)
        }
    }
    const handleCurrentBal = (e) =>{
        if(e.target.value) {
            setCurrentBal(e.target.value)
        }
    }
    const handleCreditLimit = (e) =>{
        if(e.target.value) {
            setCreditLimit(e.target.value)
        }
    }
    const handleMinPayment = (e) =>{
        if(e.target.value) {
            setMinPayment(e.target.value)
        }
    }
    const handleActualPayment = (e) =>{
        if(e.target.value) {
            setActualPayment(e.target.value)
        }
    }
    const handleLastFourCard = (e) =>{
        if(e.target.value) {
            setLastFourCard(e.target.value)
        }
    }
    const handlePaymentDay = (e) =>{
        if(e.target.value) {
            setPaymentDay(e.target.value)
        }
    }
    
    const nickNamePlaceholder = creditCard.attributes.nick_name.toString()


    console.log(creditCard)
    


    return(

        <div>
            <h3>Edit Your Credit Card</h3>

        <div className="ccFormContainer">

            <div className="ccFormDiv">
                
                <form className="edit-CC-Form" onSubmit={handleEditCreditCard}>
                    
                    
                    <label htmlFor="nick-name">Nick-name:</label>
                    <input 
                    id="nick-name"
                    type='text'
                    placeholder={`Current: ${creditCard.attributes.nick_name}`}
                    // onChange={e => setNickName(e.target.value)}
                    onChange={handleNickName}
                    // value={nickName}
                    />

                    <label htmlFor="bank-name">Bank Name:</label>
                    <input 
                    id="bank-name"
                    type='text'
                    placeholder={`Current: ${creditCard.attributes.bank_name}`}
                    onChange={handleBankName}
                    // value={bankName}
                    />
                    <label htmlFor="currentBal">Current Balance: $</label>
                    <input 
                    id="currentBal"
                    type='text'
                    placeholder={`Current: ${creditCard.attributes.current_bal}`}
                    onChange={handleCurrentBal}
                    // value={currentBal}
                    />
                    <label htmlFor="creditLimit">Credit Limit: $</label>
                    <input 
                    id="creditLimit"
                    type='text'
                    placeholder={`Current: ${creditCard.attributes.credit_limit}`}
                    onChange={handleCreditLimit}
                    // value={creditLimit}
                    />
                    <label htmlFor="minPayment">Minimum Payment: $</label>
                    <input 
                    id="minPayment"
                    type='text'
                    placeholder={`Current: ${creditCard.attributes.min_payment}`}
                    onChange={handleMinPayment}
                    // value={minPayment}
                    />
                    <label htmlFor="actualPayment">Preferred Payment Amount: $</label>
                    <input 
                    id="actualPayment"
                    type='text'
                    placeholder={`Current: ${creditCard.attributes.actual_payment}`}
                    onChange={handleActualPayment}
                    // value={actualPayment}
                    />
                    <label htmlFor="lastFourCard">Last Four Numbers on CC:</label>
                    <input 
                    id="lastFourCard"
                    type='text'
                    placeholder={`Current: ${creditCard.attributes.last_four_card}`}
                    onChange={handleLastFourCard}
                    // value={lastFourCard}
                    />
                    <label htmlFor="paymentDay">Payment Day</label>
                    <input 
                    id="paymentDay"
                    type='text'
                    placeholder={`Current: ${creditCard.attributes.payment_day}`}
                    onChange={handlePaymentDay}
                    // value={paymentDay}
                    />

                    <input type="submit" value='edit'/> 
                
                </form>
            </div>
        </div>
    </div>
    )
}