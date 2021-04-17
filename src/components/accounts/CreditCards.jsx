import { useState, useEffect } from 'react'
import axios from 'axios'
import CreditCardShow from './CreditCardShow'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'

export default function CreditCards(props){
    
const user = props.currentUser

const [creditCardData, setCreditCardData] = useState([])


const showCreditCard = async function () {
    
} 

useEffect(()=>{
    const creditCards = async function () {
        try {
            const token = localStorage.getItem('jwtToken')
            const authHeaders = {
                'Authorization': `Bearer ${token}`
            }   
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/creditcards`, { headers: authHeaders })
            const CC_DATA = response.data.data
            setCreditCardData(CC_DATA)

        } catch (error) {
            
        }
    }   
    creditCards()
}, [])
    
    let totalCCDebt = 0.00
    const ccBasicData = creditCardData.map((data,idx) =>{
        totalCCDebt += data.attributes.current_bal
        console.log(data)
        //Input ordinal NUMBER function for payment_day save to variable and put in return block 
        function ordinalNumber(i){
            let x = i % 10,
                y = i % 100
            if(x == 1 && y != 11){ return i + "st" }
            if(x == 2 && y != 12){ return i + "nd" }
            if(x == 3 && y != 13){ return i + "rd" }
            return i + "th"
        }     
        return (
            <Container fluid>
                <Row>
                    <Col xs="1">
                        <div className="cc-basic-data-div">
                            <h1 className="card-nick-name"key={data.id}>{data.attributes.nick_name} </h1>
                            <h6 key={data.id}>Card ending in: {data.attributes.last_four_card} </h6>
                            <div className="cc-number-data">
                                <h5 className="number-h5" key={data.id}> Current Balance: ${data.attributes.current_bal.toLocaleString()} </h5>
                                <h5 className="number-h5" key={data.id}> Actual Payment: ${data.attributes.actual_payment.toLocaleString()} </h5> 
                                <h5 className="number-h5" key={data.id}> Credit Limit: ${data.attributes.credit_limit.toLocaleString()} </h5> 
                            </div>   
                            <h5 key={data.id}>Due Date: {ordinalNumber(data.attributes.payment_day)} </h5>
                            
                        </div>
                    </Col>
                </Row>
                <Row> 
                    <Col xs="6">
                         <div className="mb-2">
                            <Button 
                            variant="primary" 
                            size="sm"
                            onClick={ showCreditCard() }
                            >More Details</Button>
                        </div>
                    </Col>
                </Row>

            </Container>
        
        )
    })
    
    return (
        <div>
            <h1>Your Credit Cards </h1>
            <h6>Total Credit Card Debt</h6>
            <h1>${totalCCDebt.toLocaleString()}</h1>
            <div className="main-container">
            <div className='credit-card-container'>{ccBasicData}</div>

            </div>
            
        </div>
    )
}