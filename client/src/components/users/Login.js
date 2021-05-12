import React, { useState, useContext, useEffect } from "react";

//Import context
import AlertContext from "../../context/alerts/alertContext";
import AuthContext from "../../context/auth/authContext";

const Login = props => {
  // Initialising Context
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, errors, clearErrors, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    }
    login({
      email,
      password
    });
    setUser({
      email: "",
      password: ""
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (errors) {
      setAlert(errors, "danger");
      clearErrors();
    }

    // eslint-disable-next-line
  }, [errors, isAuthenticated, props.history]);
  return (
    <div className='form-container'>
      <h2>
        <span className='text-primary'>Login</span>
      </h2>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'> Email:</label>
          <input type='email' name='email' value={email} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'> Password:</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input type='submit' className='btn btn-block btn-dark' />
        </div>
      </form>
    </div>
  );
};

export default Login;
