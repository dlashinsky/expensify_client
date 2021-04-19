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
        function ordinalNumber(i){
            let x = i % 10,
                y = i % 100
            if(x === 1 && y !== 11){ return i + "st" }
            if(x === 2 && y !== 12){ return i + "nd" }
            if(x === 3 && y !== 13){ return i + "rd" }
            return i + "th"
        }  
        let totalLoan = 0
        let totalCC = 0
        let totalFE = 0
        let totalVE = 0

        if(loanData && creditCardData && fixedExpenseData && variableExpenseData){
             loansMap = loanData.map((data, idx) =>{
                 totalLoan += data.attributes.actual_payment
                 totalMonthlyExp += data.attributes.actual_payment
                return (
                    <div className ="ccDashData">
                        <h5>${data.attributes.actual_payment.toLocaleString()}</h5>
                        <h5>{ordinalNumber(data.attributes.payment_day)}</h5>
                        
                    </div>
                )
            })
            creditCardsMap = creditCardData.map((data, idx) =>{
                totalMonthlyExp += data.attributes.actual_payment  
                totalCC += data.attributes.actual_payment 
                return (
                    <div className ="ccDashData">
                       
                        <h5>${data.attributes.actual_payment.toLocaleString()}</h5>
                        <h5>{ordinalNumber(data.attributes.payment_day)}</h5>
                    </div>
                )
            })
            fixedExpensesMap = fixedExpenseData.map((data, idx) =>{
                totalMonthlyExp += data.attributes.exp_amount
                totalFE += data.attributes.exp_amount
                return (
                    <div className ="ccDashData">
                       
                       <h5>${data.attributes.exp_amount.toLocaleString()}</h5>
                        <h5>{ordinalNumber(data.attributes.payment_day)}</h5>
                    </div>
                    
                )
            })
            variableExpMap = variableExpenseData.map((data, idx) =>{          
                function aveVarExp(min, max){
                    let aveMinMax = (min + max)/2
                    totalMonthlyExp += aveMinMax
                    totalVE += aveMinMax
                    return aveMinMax
                }  
                return (
                    <div className ="ccDashData">
                       
                       <h5>${aveVarExp(data.attributes.monthly_min, data.attributes.monthly_max)}</h5>
                        <h5>{data.attributes.exp_name}</h5>
                    </div>
                    
                )
            })
        } else {

            return "No data to show"
        }
    return (

        <div className="dashContainer">

            <h2>Welcome back, {user.first_name}!</h2>
            <h6>Here is a snap shot of what you're owing.</h6>

            <h5>Total Expenses This month</h5>
            
            <h2 className="dashTotal">${totalMonthlyExp.toLocaleString()} </h2> 

            <div className="dataDashDiv">


                <div className ="dataDash">
                        <h2>Credit Card Payments</h2>
                    <div className="dashTableLable">
                        <h3>Amount</h3>
                        <h3>Due Date</h3>
                    </div>

                    <div>
                        <h4>{creditCardsMap}</h4>
                    <div>
                        <h3>Total CC Payments:${totalCC.toLocaleString()}</h3>
                    </div>

                    </div>   
                </div>
                
                <div className="dataDash">
                    <h3>Fixed Expenses:</h3>
                    <div className="dashTableLable">
                        <h3>Amount</h3>
                        <h3>Due Date</h3>
                    </div>
                        <h4>{fixedExpensesMap}</h4>
                    <div>
                        <h3>Total Fixed Expenses:${totalFE.toLocaleString()}</h3>
                    </div>
                </div>
                
                <div className="dataDash">
                    <h2>Variable Expenses</h2> 
                    <div className="dashTableLable">
                        <h3>Amount</h3>
                        <h3>Expense</h3>
                    </div>
                    <div className="veDataDiv">
                        <h4 className="data">{variableExpMap}</h4>

                    </div>
                    <div className ="dashDataPymt">
                        <h3>Total Variable Expenses: ~${totalVE.toLocaleString()}</h3>
                    </div>

                </div>
                
                <div className="dataDash">
                    <h2>Loan Payments</h2>
                <div className="dashTableLable">
                    <h3>Amount</h3>
                    <h3>Due Date</h3>
                </div>
                    <h4 className="data">{loansMap}</h4>
                    <div>
                        <h3>Total Loan Payments:${totalLoan.toLocaleString()}</h3>
                    </div>
                </div>

            </div>

        </div>
          
    )
}