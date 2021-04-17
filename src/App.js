import { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Home from './components/Home'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import SideNav from './components/SideNav'
import CreditCards from './components/accounts/CreditCards'
import FixedExpenses from './components/accounts/FixedExpenses'
import VariableExpenses from './components/accounts/VariableExpenses'
import Loans from './components/accounts/Loans'
import Savings from './components/accounts/Savings'
import 'bootstrap/dist/css/bootstrap.min.css'
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
        <Navbar currentUser={ currentUser } handleLogout={ handleLogout } />
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
              path="/credit-cards"
              render={ (props) => <CreditCards {...props} currentUser={ currentUser } setCurrentUser={ setCurrentUser} /> }
            />
            <Route 
              path="/fixed-expenses"
              render={ (props) => <FixedExpenses {...props} currentUser={ currentUser } setCurrentUser={ setCurrentUser} /> }
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
