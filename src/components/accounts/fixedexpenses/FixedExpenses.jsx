import { useState, useEffect } from 'react'
import axios from 'axios'
import FixedExpenseShow from './FixedExpenseShow'
import ButtonFEedit from './buttons/buttonFEedit'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link, Redirect } from 'react-router-dom'

export default function FixedExpenses(props){
    const user = props.currentUser.first_name
    
    const [fixedExpenseData, setFixedExpenseData] = useState([])
    const [showFEData, setShowFEData] = useState([])

    useEffect(()=>{
        const fixedExpenses = async function () {
            try {
                const token = localStorage.getItem('jwtToken')
                const authHeaders = {
                    'Authorization': `Bearer ${token}`
                }   
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/fixedexpenses`, { headers: authHeaders })
                const FE_DATA = response.data.data
                
                setFixedExpenseData(FE_DATA)

            } catch (error) {
                
            }
        }   
        fixedExpenses()
    }, [])

    let totalFE = 0.00
    const feBasicData = fixedExpenseData.map((data,idx) =>{
        if(
            data.attributes.exp_name && 
            data.attributes.exp_type && 
            data.attributes.exp_amount &&
            data.attributes.payment_day)
            {
                totalFE += data.attributes.exp_amount
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
                                    <h1 className="card-nick-name"key={idx}>{data.attributes.exp_name} </h1>
                                    <h6 key={idx}>For: {data.attributes.exp_type} </h6>
                                    <div className="cc-number-data">
                                        <h5 className="number-h5" key={idx}> Monthly Amount: ${data.attributes.exp_amount.toLocaleString()} </h5>
                                    </div>   
                                    <h5 key={data.id}>Due Date: {ordinalNumber(data.attributes.payment_day)} </h5>
                                </div>
                            </Col>
                        </Row>
                        <Row> 
                            <Col xs="6">
                                <div className="mb-2">
                                    <ButtonFEedit key={idx} fixedExpenseInfo={data}/>
                                </div>
                            </Col>
                        </Row>
                    </Container>                
                )

            }
    })

    return (
        <div>
            <h1>Your Fixed Expenses </h1>
            <div className= "ccIndexDebtCalc">
                <h6>Total Fixed Expenses:</h6>
                <h1>${totalFE.toLocaleString()}</h1>
            </div>
            <Link to="new-fixed-expense"><Button className="addNewCCBtn">Add a new Fixed Expense!</Button></Link>
            <div className="main-container">
            <div className='credit-card-container'>{feBasicData}</div>

            </div>
        </div>
    )
}