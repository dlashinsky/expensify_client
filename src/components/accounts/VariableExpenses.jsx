export default function VariableExpenses(props){
    const user = props.currentUser.first_name
    
    return (
        <div>
            <h1>Hello {user} From Variable Expenses!! </h1>
            
        </div>
    )
}

