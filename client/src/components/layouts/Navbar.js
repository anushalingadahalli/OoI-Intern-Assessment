import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const { user, isAuthenticated, logout } = authContext;

  const authLinks = (
    <Fragment>
      <li>Hello, {user && user.name}</li>
      <li>
        <a href='#!' onClick={logout}>
          Logout
        </a>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/register'> Register </Link>
      </li>
    </Fragment>
  );
  return (
    <Fragment>
      <header className='navbar'>
        <h1>LOGIN AND REGISTRATION SYSTEM </h1>
        <nav>
          <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
        </nav>
      </header>
    </Fragment>
  );
};

export default Navbar;
