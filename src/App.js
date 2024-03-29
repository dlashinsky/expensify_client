//DEPENDENCIES AND IMPORTS
import { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

//NAVIGATION/AUTHENTICATION COMPONENTS
import TopNavbar from './components/TopNavbar'
import Register from './components/Register'
import Home from './components/Home'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import SideNav from './components/SideNav'
//CREDIT CARD COMPONENTS
import CreditCards from './components/accounts/creditcards/CreditCards'
import CreditCardShow from './components/accounts/creditcards/CreditCardShow'
import CreditCardEdit from './components/accounts/creditcards/CreditCardEdit'
import NewCreditCard from './components/accounts/creditcards/NewCreditCard'
//FIXED EXPENSE COMPONENTS
import FixedExpenses from './components/accounts/fixedexpenses/FixedExpenses'
import FixedExpenseShow from './components/accounts/fixedexpenses/FixedExpenseShow'
import FixedExpenseEdit from './components/accounts/fixedexpenses/FixedExpenseEdit'
import NewFixedExpense from './components/accounts/fixedexpenses/NewFixedExpense'

//VARIABLE EXPENSE COMPONENTS
import VariableExpenses from './components/accounts/VariableExpenses'

//LOAN COMPONENTS
import Loans from './components/accounts/Loans'

//SAVINGS COMPONENTS
import Savings from './components/accounts/Savings'
import './App.css';

function App() {
  // user data will be in state when the user is logged in 
  const[currentUser, setCurrentUser] = useState(null)

  //useEffect if the user navigates away from the site and comes back

  //deletes the jwt from local storage when teh user wants to log out
  const handleLogout = () => {
    if(localStorage.getItem('jwtToken')){
      localStorage.removeItem('jwtToken')
      setCurrentUser(null)
    }
  }

  return (
    <Router>
      

      <header>
        <TopNavbar currentUser={ currentUser } handleLogout={ handleLogout } />
      </header>

      <div className='home-div-route'>
        <Route exact path="/" component={ Home } currentUser = { currentUser }/>

        <Route 
          path="/register"
          render={ (props) => <Register {...props} currentUser={ currentUser } setCurrentUser={ setCurrentUser} /> }
        />

        <Route 
          path="/login"
          render={ (props) => <Login {...props} currentUser={ currentUser } setCurrentUser={ setCurrentUser} /> }
        />
      </div>

      <div className="app-container">
      
        {currentUser && <SideNav currentUser= { currentUser }></SideNav>}
        
        <div className="App">
          <Switch>

            <Route 
              path="/dashboard"
              render={ (props) => <Dashboard {...props} currentUser={ currentUser } setCurrentUser={ setCurrentUser} /> }
            />

            <Route 
              exact path="/credit-cards"
              render={ (props) => <CreditCards {...props} currentUser={ currentUser } setCurrentUser={ setCurrentUser} /> }
            />
            <Route 
              path="/credit-cards/show"
              render={ (props) => <CreditCardShow {...props} currentUser={ currentUser } /> }
            />
            <Route 
              exact path="/credit-cards/edit"
              render={ (props) => <CreditCardEdit {...props} currentUser={ currentUser } /> }
            />
            <Route 
              path="/new-credit-card"
              render={ (props) => <NewCreditCard {...props} currentUser={ currentUser } /> }
            />
            <Route 
              exact path="/fixed-expenses"
              render={ (props) => <FixedExpenses {...props} currentUser={ currentUser } /> }
            />
            <Route 
              path="/fixed-expenses/show"
              render={ (props) => <FixedExpenseShow {...props} currentUser={ currentUser }  /> }
            />
            <Route 
              exact path="/fixed-expenses/edit"
              render={ (props) => <FixedExpenseEdit {...props} currentUser={ currentUser }  /> }
            />
            <Route 
              path="/new-fixed-expenses"
              render={ (props) => <NewFixedExpense {...props} currentUser={ currentUser }  /> }
            />
            <Route 
              path="/variable-expenses"
              render={ (props) => <VariableExpenses {...props} currentUser={ currentUser } setCurrentUser={ setCurrentUser} /> }
            />
            <Route 
              path="/loans"
              render={ (props) => <Loans {...props} currentUser={ currentUser } setCurrentUser={ setCurrentUser} /> }
            />
            <Route 
              path="/savings"
              render={ (props) => <Savings {...props} currentUser={ currentUser } setCurrentUser={ setCurrentUser} /> }
            />
          
          </Switch>
            
        </div>

      </div>
          

    </Router>
  )
}

export default App;
