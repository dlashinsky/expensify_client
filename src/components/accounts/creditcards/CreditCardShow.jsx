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
    let cardDetails = moreDetails.attributes

                // console.log(moreDetails)
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

    let balance = cardDetails.current_bal

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

                <div className="ccShowCardBalanceData"> 
                    <h3>Current Balance: ${cardDetails.current_bal.toLocaleString()}</h3>
                    <h4>Available Spending Power: ${spendingPowFunc(cardDetails.credit_limit, balance)}</h4>
                </div>
                    <h5>Due on the {ordinalNumber(cardDetails.payment_day)}</h5>

                <div className="ccShowCardinfo">
                    <h4>Card Information</h4>   
                    <h5>Lender: {cardDetails.bank_name}</h5>
                    <h5>Credit Limit: {cardDetails.credit_limit}</h5>
                    <h5>{cardDetails.bank_name}</h5>
                    <h5>Lender: {cardDetails.bank_name}</h5>
                    <h5>Lender: {cardDetails.bank_name}</h5>
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