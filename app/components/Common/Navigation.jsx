import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navigation = props => {
  const { openAuthModal, profile, loggedIn, signOut } = props;
  const getAccountLink = () => {
    if (loggedIn) return <NavLink to={`/account/${profile.uid}`}>Hi {profile.firstName}</NavLink>;
    return <NavLink to="#" onClick={(event) => openAuthModal(event, 'register')}>Register</NavLink>;
  };
  const getLoginLogoutLink = () => {
    if (loggedIn) return <NavLink to="#" onClick={(event) => signOut(event)}>Logout</NavLink>;
    return <NavLink to="#" onClick={(event) => openAuthModal(event, 'login')}>Login</NavLink>;
  };
  return (
    <nav className="navigation">
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li>{getAccountLink()}</li>
        <li>{getLoginLogoutLink()}</li>
        <li><NavLink to="/add">Add Post</NavLink></li>
      </ul>
    </nav>
  );
};
