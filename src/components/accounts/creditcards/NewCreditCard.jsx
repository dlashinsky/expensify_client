import { useState } from 'react'
import axios from 'axios'
import CreditCards from './CreditCards'
import { Redirect } from 'react-router-dom'

export default function NewCreditCard(props){
    
    const user = props.currentUser.user_id

    console.log("user log", user)
    const [redirect, setRedirect] = useState(false)
    const [nickName, setNickName] = useState('')
    const [bankName, setBankName] = useState('')
    const [currentBal, setCurrentBal] = useState('')
    const [creditLimit, setCreditLimit] = useState('')
    const [minPayment, setMinPayment] = useState('')
    const [actualPayment, setActualPayment] = useState('')
    const [lastFourCard, setLastFourCard] = useState('')
    const [paymentDay, setPaymentDay] = useState('')
   
   console.log("before funciton ", redirect)
    const addNewCreditCard = async (e) => {
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
                user_id: user
            }
            console.log(requestBody)
            const token = localStorage.getItem('jwtToken')
            const authHeaders = {
                'Authorization': `Bearer ${token}`
            }   
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/creditcards`, requestBody, { headers: authHeaders })
            
            alert("Your Credit Card has Been added")
            setRedirect(true)

        } catch (error) {
            console.log(error)
        }
    }   
   
   console.log("after function ", redirect)
    
            if (redirect) return <Redirect to='/credit-cards'/>

    return(
        <div>
        <h1>Hello from New Credit Card</h1>
    
            <h3>Add a new credit card </h3>

            {/* <p>{message}</p> */}


            <form onSubmit={addNewCreditCard}>
                
                <label htmlFor="nick-name">Nick-name:</label>
                <input 
                id="nick-name"
                type='text'
                placeholder='My Personal CC'
                onChange={e => setNickName(e.target.value)}
                value={nickName}
                />

                <label htmlFor="bank-name">Bank Name:</label>
                <input 
                id="bank-name"
                type='text'
                placeholder='Bank of America'
                onChange={e => setBankName(e.target.value)}
                value={bankName}
                />
                <label htmlFor="currentBal">Current Balance: $</label>
                <input 
                id="currentBal"
                type='text'
                placeholder="'4234.12' (no symbols or spaces)"
                onChange={e => setCurrentBal(e.target.value)}
                value={currentBal}
                />
                <label htmlFor="creditLimit">Credit Limit: $</label>
                <input 
                id="creditLimit"
                type='text'
                placeholder="'15000' (no symbols or spaces)"
                onChange={e => setCreditLimit(e.target.value)}
                value={creditLimit}
                />
                <label htmlFor="minPayment">Minimum Payment: $</label>
                <input 
                id="minPayment"
                type='text'
                placeholder="'85.00' (no symbols or spaces)"
                onChange={e => setMinPayment(e.target.value)}
                value={minPayment}
                />
                <label htmlFor="actualPayment">Preferred Payment Amount: $</label>
                <input 
                id="actualPayment"
                type='text'
                placeholder="'250' (no symbols or spaces)"
                onChange={e => setActualPayment(e.target.value)}
                value={actualPayment}
                />
                <label htmlFor="lastFourCard">Last Four Numbers on CC:</label>
                <input 
                id="lastFourCard"
                type='text'
                placeholder='5561'
                onChange={e => setLastFourCard(e.target.value)}
                value={lastFourCard}
                />
                <label htmlFor="paymentDay">Payment Day</label>
                <input 
                id="paymentDay"
                type='text'
                placeholder="'15' (just day number)"
                onChange={e => setPaymentDay(e.target.value)}
                value={paymentDay}
                />

                {/* <input type="hidden" value={user}/> */}

                <input type="submit" value='Add'/>

            </form>

        </div>
    )
}