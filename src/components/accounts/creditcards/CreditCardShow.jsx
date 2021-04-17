import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'



export default function CreditCardShow(props){
    const location = useLocation()
    const creditCardId = location.state.creditCardInfo
    const [moreDetails, setMoreDetails] = useState({})
    const [loaded, setLoaded] = useState(false)

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
                
            }
        }   
        creditCard()
    }, [])

    const handleEdit = (e) =>{
        e.preventDefault()
        console.log("edit button is working!")
    }
    
        <Link to='/testpath'>test</Link>


    
    if (loaded){
        return(
            <div>
                <div>{moreDetails.attributes.nick_name}</div>
                <div>{moreDetails.attributes.bank_name}</div>
                <div>{moreDetails.attributes.payment_day}</div>
                <div>{moreDetails.attributes.actual_payment}</div>

                <Button onClick={handleEdit}>Edit Card</Button>
            </div>
        )
    } else {
        return(
            <h1>Hello!</h1>
        )
    }
}