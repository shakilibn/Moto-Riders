import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import NoMatch from './components/NoMatch/NoMatch';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import { useState } from 'react';
import { createContext } from 'react';
import Destination from './components/Destination/Destination';
import Blog from './components/Blog/Blog';
import Contact from './components/Contact/Contact';
import RiderDetails from './components/RiderDetails/RiderDetails';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
})
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
      <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/home">
          <Home />
        </Route>

        <PrivateRoute path="/destination">
          <Destination />
        </PrivateRoute>

        <Route path="/blog">
          <Blog />
        </Route>

        <Route path="/contact">
          <Contact />
        </Route>

        <PrivateRoute path="/rider/:riderName">
          <RiderDetails />
        </PrivateRoute>

        <Route path="/login">
          <Login />
        </Route>
        
        <Route path="*">
          <NoMatch />
        </Route>

      </Switch>      
    </Router>
    </UserContext.Provider>
  );
}

export default App;
