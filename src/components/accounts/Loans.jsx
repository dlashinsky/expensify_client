export default function Loans (props){
    const user = props.currentUser.first_name
    
    return (
        <div>
           <h1>Hello {user} From Loans!! </h1>
        </div>
    )
}