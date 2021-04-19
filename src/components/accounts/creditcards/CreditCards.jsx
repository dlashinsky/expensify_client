import { useState, useEffect } from 'react'
import axios from 'axios'
import CreditCardShow from './CreditCardShow'
import ButtonCCInfo from './buttons/ButtonCCInfo'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link, Redirect } from 'react-router-dom'


export default function CreditCards(props){
    
    const user = props.currentUser

    const [creditCardData, setCreditCardData] = useState([])
    const [showCCData, setShowCCData] = useState([])


    const showCreditCard = function () {
        console.log(`button is linked!!`)
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

    const handleDelete = (e) =>{
       e.preventDefault()
        console.log("Delete Button is linked!")
    }
   
    let totalCCDebt = 0.00
    const ccBasicData = creditCardData.map((data,idx) =>{
        if(
            data.attributes.nick_name && 
            data.attributes.last_four_card && 
            data.attributes.current_bal &&
            data.attributes.actual_payment &&
            data.attributes.credit_limit &&
            data.attributes.payment_day)
            {
                totalCCDebt += data.attributes.current_bal
                function ordinalNumber(i){
                    let x = i % 10,
                        y = i % 100
                    if(x === 1 && y !== 11){ return i + "st" }
                    if(x === 2 && y !== 12){ return i + "nd" }
                    if(x === 3 && y !== 13){ return i + "rd" }
                    return i + "th"
                }     
                return (
                    <Container fluid>
                        <Row>
                            <Col xs="1">
                                <div className="cc-basic-data-div">
                                    <h1 className="card-nick-name"key={idx}>{data.attributes.nick_name} </h1>
                                    <h6 key={idx}>Card ending in: {data.attributes.last_four_card} </h6>
                                    <div className="cc-number-data">
                                        <h5 className="number-h5" key={idx}> Current Balance: ${data.attributes.current_bal.toLocaleString()} </h5>
                                        <h5 className="number-h5" key={idx}> Actual Payment: ${data.attributes.actual_payment.toLocaleString()} </h5> 
                                        <h5 className="number-h5" key={idx}> Credit Limit: ${data.attributes.credit_limit.toLocaleString()} </h5> 
                                    </div>   
                                    <h5 key={data.id}>Due Date: {ordinalNumber(data.attributes.payment_day)} </h5>
                                </div>
                            </Col>
                        </Row>
                        <Row> 
                            <Col xs="6">
                                <div className="mb-2">
                                    <ButtonCCInfo key={idx} creditCardId={data.id}/>
                                </div>
                            </Col>
                        </Row>
                    </Container>                
                )

            }
    })
    
    return (
        <div>
            <h1>Your Credit Cards </h1>
            <div className= "ccIndexDebtCalc">
                <h6>Total Credit Card Debt</h6>
                <h1>${totalCCDebt.toLocaleString()}</h1>
            </div>
            <Link to="new-credit-card"><Button className="addNewCCBtn">Add a new CreditCard</Button></Link>
            <div className="main-container">
            <div className='credit-card-container'>{ccBasicData}</div>

            </div>
            
        </div>
    )
}