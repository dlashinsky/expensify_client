import { useLocation, Redirect } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ButtonCCEdit from './buttons/ButtonCCEdit'
import Button from 'react-bootstrap/Button'

export default function CreditCardShow(props){
    const location = useLocation()
    const creditCardId = location.state.creditCardInfo
    const [moreDetails, setMoreDetails] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [deleted, setDeleted] = useState(false)
    

                // console.log(cardDetails.current_bal)
                // console.log("MORE DETAILS BEFORE")

    useEffect(()=>{
        const creditCard = async function () {
            try {
                const token = localStorage.getItem('jwtToken')
                const authHeaders = {
                    'Authorization': `Bearer ${token}`
                }  

                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/creditcards/${creditCardId}`, { headers: authHeaders })
                const CC_DATA = response.data.data
                // console.log(CC_DATA)
                // console.log("^^^^^^^^^^^^^^^")
                setMoreDetails(CC_DATA)
                setLoaded(true)
                
            } catch (error) {
                console.log(error)
            }
        }   
        creditCard()
    }, [])

    const handleDelete = async function () {
        try {
       
        const token = localStorage.getItem('jwtToken')
        const authHeaders = {
            'Authorization': `Bearer ${token}`
        }  
        const bearerToken = `Bearer ${token}`
        const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/creditcards/${creditCardId}`, { headers: authHeaders })
        setDeleted(true)
        console.log(response)
        } catch (error) {
            console.log(error)
        }
        
    }

    if(deleted) return <Redirect to='/credit-cards'/>
    
    
    let cardDetails = moreDetails.attributes
    console.log(cardDetails)
    console.log("this log ^^^^")
    let balance;
    if(cardDetails){
        balance = cardDetails.current_bal
    }

    function spendingPowFunc(limit, bal){
        let sPower = limit - bal
        return sPower.toLocaleString()
    } 

    function ordinalNumber(i){
        let x = i % 10,
            y = i % 100
        if(x === 1 && y !== 11){ return i + "st" }
        if(x === 2 && y !== 12){ return i + "nd" }
        if(x === 3 && y !== 13){ return i + "rd" }
        return i + "th"
    }     
    
    if (loaded){
        return(
            <div className="ccShowCardContainer">
                <h1>Your {cardDetails.nick_name} Credit Card</h1>
                <p> (ending in {cardDetails.last_four_card})</p>

                <div className="ccShowCardBalanceData"> 
                    <h3>Current Balance: ${cardDetails.current_bal.toLocaleString()}</h3>
                    <h6>Available Spending Power: ${spendingPowFunc(cardDetails.credit_limit, balance)}</h6>
                </div>
                    <h2>Card Information</h2> 

                <div className="ccShowCardinfo">

                        <div className="ccCardDataTitleDiv">
                        <h5>Lender/Bank:</h5>
                        <h5>Credit Limit:</h5>
                        <h5>Due on the:</h5>
                        <h5>Minimum Payment:</h5>
                        <h5>Your Preferred Payment:</h5>
                    </div>

                    <div className="ccCardDataDiv">
                        <h5>{cardDetails.bank_name}</h5>
                        <h5>${cardDetails.credit_limit.toLocaleString()}</h5>
                        <h5>{ordinalNumber(cardDetails.payment_day)}</h5>
                        <h5>${cardDetails.min_payment.toLocaleString()}</h5>
                        <h5>${cardDetails.actual_payment.toLocaleString()}</h5>
                    </div>  

                </div>

                <div className="ccShowButtons">
                    <ButtonCCEdit creditCardData={moreDetails}/>
                    <Button onClick={handleDelete}>Delete</Button>

                </div>
            </div>
        )
    } else {
        return(
            <h1>Hello!</h1>
        )
    }
}