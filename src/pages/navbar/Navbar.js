import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth'
import './navbar.css'

function Navbar() {
  const context = useContext(AuthContext);
  return (
    <div className='navbar-container'>
      <Link to='/'><div className="logo">Code Portal</div></Link>
      {context.user ? <Link to='/dashboard'><div className='name'>{context.user.username[0].toUpperCase()}</div></Link> : 
      <div className='name-loggedout'>
      <Link to='/login'><div className='nav-login'>Login</div></Link>
      <Link to='/signup'><div className='nav-register'>Signup</div></Link>
      </div>
      }

    </div>
  )
}

export default Navbar