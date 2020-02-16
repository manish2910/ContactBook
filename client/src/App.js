import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ContactState from './context/contact/ContactState';
import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/routing/PrivateRoute';
import Alerts from './components/layout/Alerts';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';

const App = () => {
      return (
        <AuthState>
          <ContactState>
            <AlertState>
              <Router>
                <Navbar />
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <PrivateRoute path='/about' component={About} />
                  <Route path='/register' component={Register} />
                  <Route path='/login' component={Login} />
                </Switch>
              </Router>
            </AlertState>
          </ContactState>
        </AuthState>
      );
}

export default App;
