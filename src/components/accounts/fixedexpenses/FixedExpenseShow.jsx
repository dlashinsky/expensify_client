import { useLocation, Redirect } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ButtonFEedit from './buttons/buttonFEedit'
import Button from 'react-bootstrap/Button'

export default function FixedExpenseShow(props){
    const location = useLocation()
    const fixedExpenseId = location.state.fixedExpenseInfo
    const [moreDetails, setMoreDetails] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [deleted, setDeleted] = useState(false)
    let expenseDetails = moreDetails.attributes

                // console.log(moreDetails)
                // console.log("MORE DETAILS BEFORE")

    useEffect(()=>{
        const fixedExpense = async function () {
            try {
                const token = localStorage.getItem('jwtToken')
                const authHeaders = {
                    'Authorization': `Bearer ${token}`
                }  

                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/fixedexpenses/${fixedExpenseId}`, { headers: authHeaders })
                const FE_DATA = response.data.data
                // console.log(CC_DATA)
                // console.log("^^^^^^^^^^^^^^^")
                setMoreDetails(FE_DATA)
                setLoaded(true)
                
            } catch (error) {
                console.log(error)
            }
        }   
        fixedExpense()
    }, [])

    const handleDelete = async function () {
        try {
       
        const token = localStorage.getItem('jwtToken')
        const authHeaders = {
            'Authorization': `Bearer ${token}`
        }  
        const bearerToken = `Bearer ${token}`
        const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/fixedexpenses/${fixedExpenseId}`, { headers: authHeaders })
        setDeleted(true)
        console.log(response)
        } catch (error) {
            console.log(error)
        }
        
    }

    if(deleted) return <Redirect to='/fixed-expenses'/>

   
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
                <h1>Your {expenseDetails.exp_name} Expense</h1>

                <div className="ccShowCardBalanceData"> 
                    <h3>Monthly Payment Amount: ${expenseDetails.exp_amount.toLocaleString()}</h3>
                </div>
                    <h5>Due on the {ordinalNumber(expenseDetails.payment_day)}</h5>

                <div className="ccShowButtons">
                    <ButtonFEedit fixedExpenseData={moreDetails}/>
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