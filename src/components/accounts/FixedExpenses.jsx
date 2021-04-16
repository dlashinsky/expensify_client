export default function FixedExpenses(props){
    const user = props.currentUser.first_name
    
    return (
        <div>
            <h1>Hello {user} From Fixed Expenses!! </h1>
        </div>
    )
}