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
    
    if (loaded){
        return(
            <div>
                <div>{moreDetails.attributes.nick_name}</div>
                <div>{moreDetails.attributes.bank_name}</div>
                <div>{moreDetails.attributes.payment_day}</div>
                <div>{moreDetails.attributes.actual_payment}</div>

                <ButtonCCEdit creditCardData={moreDetails}/>
                <Button onClick={handleDelete}>Delete</Button>
            </div>
        )
    } else {
        return(
            <h1>Hello!</h1>
        )
    }
}