import { useEffect, useState } from 'react'
import axios from 'axios'


export default function Dashboard(props){

    const user = props.currentUser
    const [creditCardData, setCreditCardData] = useState([])
    const [fixedExpenseData, setFixedExpenseData] = useState([])
    const [variableExpenseData, setVariableExpenseData] = useState([])
    const [loanData, setLoanData] = useState([])

    
    useEffect(() =>{

        const userDataCall = async function () {
            try {
                const token = localStorage.getItem('jwtToken')
                const authHeaders = {
                    'Authorization': `Bearer ${token}`
                }   
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/${user.user_id}`, { headers: authHeaders })
                const USER_DATA= response.data.data 
                // console.log(USER_DATA)

                //Dig into the API and get record IDs associated with user set to State
                const creditCardAPI = USER_DATA.relationships.credit_cards.data
                let ccArray = []
                let ccData = []
                const loop = creditCardAPI.map((data, idx) =>{
                    ccArray.push(data.id)
                })
                for(let i=0; i < ccArray.length; i++){
                    let ccResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/creditcards/${ccArray[i]}`, { headers: authHeaders })
                    ccData.push(ccResponse.data.data)
                }
                // console.log(ccData)

                setCreditCardData(ccData)

                const fixedExpenseAPI = USER_DATA.relationships.fixed_expenses.data
                let feArray = []
                let feData = []
                const loop2 = fixedExpenseAPI.map((data, idx) =>{
                    feArray.push(data.id)
                })
                for(let i=0; i < feArray.length; i++){
                    let feResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/fixedexpenses/${feArray[i]}`, { headers: authHeaders })
                    feData.push(feResponse.data.data)
                }

                setFixedExpenseData(feData)

                const variableExpenseAPI = USER_DATA.relationships.variable_expenses.data
                let veArray = []
                let veData = []
                const loop3 = variableExpenseAPI.map((data, idx) =>{
                    veArray.push(data.id)
                })
                for(let i=0; i < veArray.length; i++){
                    let veResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/variableexpenses/${veArray[i]}`, { headers: authHeaders })
                    veData.push(veResponse.data.data)
                }
                setVariableExpenseData(veData)

                const loanAPI = USER_DATA.relationships.loans.data
                let loanArray = []
                let loanData = []
                const loop4 = loanAPI.map((data, idx) =>{
                    loanArray.push(data.id)
                })
                console.log(loanArray)
                console.log("^^^")
                for(let i=0; i < loanArray.length; i++){
                    let loanResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/loans/${loanArray[i]}`, { headers: authHeaders })
                    loanData.push(loanResponse.data.data)
                }
                setLoanData(loanData)

        
                
            } catch (error) {
                console.log(error)
            }
        }
        userDataCall()
    },[])

        // if(creditCardData){
        //     console.log(creditCardData)
        //     console.log("here are the CC Ids")
        // }
        // if(fixedExpenseData){
        //     console.log(fixedExpenseData)
        //     console.log("here is the FE data")
        // }
        // if(variableExpenseData){
        //     console.log(variableExpenseData)
        //     console.log("here is the VE Data")
        // }
        let loansMap;
        let creditCardsMap;
        let fixedExpensesMap;
        let variableExpMap;
        let totalMonthlyExp = 0;

        if(loanData && creditCardData && fixedExpenseData && variableExpenseData){
             loansMap = loanData.map((data, idx) =>{
                 totalMonthlyExp += data.attributes.actual_payment
                return (
                    <h5>${data.attributes.actual_payment.toLocaleString()}</h5>
                )
            })
            creditCardsMap = creditCardData.map((data, idx) =>{
                totalMonthlyExp += data.attributes.actual_payment
                return (
                    <h5>${data.attributes.actual_payment.toLocaleString()}</h5>
                )
            })
            fixedExpensesMap = fixedExpenseData.map((data, idx) =>{
                totalMonthlyExp += data.attributes.exp_amount
                return (
                    <h5>${data.attributes.exp_amount.toLocaleString()}</h5>
                )
            })
            variableExpMap = variableExpenseData.map((data, idx) =>{          
                function aveVarExp(min, max){
                    let aveMinMax = (min + max)/2
                    totalMonthlyExp += aveMinMax
                    return aveMinMax
                }  
                return (
                    <h5>${aveVarExp(data.attributes.monthly_min, data.attributes.monthly_max)}</h5>
                )
            })
        } else {

            return "No data to show"
        }
    return (

        <div>
            <h1>Hello {user.first_name} from Dashboard!</h1>

            <h2>Total Expenses This month</h2>
               <h3>${totalMonthlyExp.toLocaleString()} </h3> 

            <h2>Credit Card Payments Due:</h2>
                {creditCardsMap}

            <h2>Fixed Expenses:</h2>
                {fixedExpensesMap}
            
            <h2>Variable Expenses</h2>
                {variableExpMap}

            <h2>Loan Payments Due: </h2>
                {loansMap}


        </div>
          
    )
}