import { useState, useEffect } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function CreditCards(props){
    
const user = props.currentUser

const [creditCardData, setCreditCardData] = useState([])

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
        return (
            <Container fluid>
                <Row>
                    <Col xs="1">
                        <div className="cc-basic-data-div">
                            <h1 className="card-nick-name"key={data.id}>{data.attributes.nick_name} </h1>
                            <div className="cc-number-data">
                            <h5 className="number-h5" key={data.id}> Current Balance: ${data.attributes.current_bal.toLocaleString()} </h5>
                            <h5 className="number-h5" key={data.id}> Actual Payment: ${data.attributes.actual_payment.toLocaleString()} </h5> 
                            <h5 className="number-h5" key={data.id}> Credit Limit: ${data.attributes.credit_limit.toLocaleString()} </h5> 

                            </div>
                            <h5 key={data.id}>Card#: {data.attributes.last_four_card} </h5>
                            <h5 key={data.id}>Due on the: {data.attributes.payment_day}st/nd/rd/th </h5>
                        </div>
                    </Col>
                </Row>

            </Container>
        
        )
    })
    
    console.log(typeof(totalCCDebt))
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