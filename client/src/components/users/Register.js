import React, { useState, useContext, useEffect } from "react";

import AlertContext from "../../context/alerts/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = props => {
  // Initialise the Context
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, errors, isAuthenticated, clearErrors } = authContext;

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  useEffect(() => {
    /*
    if (isAuthenticated) {
      props.history.push("/");
    }
*/
    if (errors) setAlert(errors, "danger");
    clearErrors();
    // eslint-disable-next-line
  }, [errors, isAuthenticated, props.history]);

  const { name, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setAlert("Please entered all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({
        name,
        email,
        password
      });
    }
    setUser({
      name: "",
      email: "",
      password: "",
      password2: ""
    });
  };

  return (
    <div className='form-container'>
      <h2>
        {" "}
       <span className='text-primary'>REGISTRATION FORM</span>
      </h2>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'> Name:</label>
          <input type='text' name='name' value={name} onChange={onChange} />
        </div>
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
          <label htmlFor='password'> Confirm Password:</label>
          <input
            type='password'
            name='password2'
            value={password2}
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
export default Register;
