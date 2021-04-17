export default function Dashboard(props){

    const user = props.currentUser
    return (
        <h1>Hello {user.first_name} from Dashboard!</h1>
          
    )
}