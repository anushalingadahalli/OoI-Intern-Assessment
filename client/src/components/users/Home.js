import React, { useContext, useEffect } from "react";

import AuthContext from "../../context/auth/authContext";

// eslint-disable-next-line

const Home = () => {
  const authContext = useContext(AuthContext);

  const { loadUser, user } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2 className='bg-primary'>
        {" "}
        Welcome {user && user.name}, You're now at home{" "}
      </h2>
      <h3> Your Details is as below:</h3>
      <ul>
        <li className='badge-success p m'> {user && user.name} </li>
        <li className='badge-dark p m'> {user && user.email}</li>
      </ul>
    </div>
  );
};

export default Home;
