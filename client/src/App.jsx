import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import setAuthToken from "./utils/setAuthToken";

// Context
import AlertState from "./context/alerts/AlertState";
import AuthState from "./context/auth/AuthState";

// Components
import Navbar from "./components/layouts/Navbar";
import Alert from "./components/layouts/alert/Alerts";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import Home from "./components/users/Home";
import PrivateRoute from "./components/routing/PrivateRoute";

//load token
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <div className='App'>
      <AuthState>
        <AlertState>
          <Router>
            <Navbar />
            <div className='container'>
              <Alert />
              <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
              </Switch>
            </div>
          </Router>
        </AlertState>
      </AuthState>
    </div>
  );
}

export default App;
