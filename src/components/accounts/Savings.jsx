export default function Savings(props){
    const user = props.currentUser.first_name
    
    return (
        <div>
            <h1>Hello {user} savings!! </h1>
        </div>
    )
}