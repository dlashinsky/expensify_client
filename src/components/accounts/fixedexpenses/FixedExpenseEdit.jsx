import { useLocation, Redirect } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import  Form  from 'react-bootstrap/Form'

export default function FixedExpenseEdit(props) {

    const location = useLocation()
    const expenseData = location.state.fixedExpenseData

    const [edited, setEdited] = useState(false)
    const [expName, setExpName] = useState('')
    const [expType, setExpType] = useState('')
    const [expAmount, setExpAmount] = useState('')
    const [paymentDay, setPaymentDay] = useState('')


    useEffect(()=>{
        setExpName(expenseData.attributes.exp_name)
        setExpType(expenseData.attributes.exp_type)
        setExpAmount(expenseData.attributes.exp_amount)
        setPaymentDay(expenseData.attributes.payment_day)
    
    },[])

    const handleEditFixedExpense = async (e) =>{
        try {
            e.preventDefault()
            
            const requestBody = {
                exp_name: expName,
                exp_type: expType,
                exp_amount: expAmount,
                payment_day: paymentDay,
            }

            const token = localStorage.getItem('jwtToken')
            const authHeaders = {
                'Authorization': `Bearer ${token}`
            }   
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/v1/fixedexpenses/${expenseData.id}`, requestBody, { headers: authHeaders })
            console.log(response)
            setEdited(true)
        } catch (error) {
            console.log(error)
        }
    }

    if(edited) return <Redirect to='/fixed-expenses'/>




    const handleExpName = (e) =>{
        if(e.target.value) {
            setExpName(e.target.value)
        }
    }
    const handleExpType = (e) =>{
        if(e.target.value) {
            setExpType(e.target.value)
        }
    }
    const handleExpAmount = (e) =>{
        if(e.target.value) {
            setExpAmount(e.target.value)
        }
    }
    const handlePaymentDay = (e) =>{
        if(e.target.value) {
            setPaymentDay(e.target.value)
        }
    }

    

    return (
        <div>
            <Form onSubmit={handleEditFixedExpense}>

                <Form.Group controlId="formEditFEname">
                        <Form.Control 
                        placeholder={`Current: ${expenseData.attributes.exp_name}`}
                        onChange={handleExpName}
                        />
                </Form.Group>

            </Form>
        </div>
    )
}