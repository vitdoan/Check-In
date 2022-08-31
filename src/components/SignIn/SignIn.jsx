import React from 'react';
import './signin.css'

export default function SignIn({changeRoute}) {
    return <div className="login">
  <input type="text" placeholder="Username" className='username'/>
  <input type="password" placeholder="Password" className='password'/>
  <button className='loginButton' onClick={()=>changeRoute(3)}>Sign In</button>
  <div className='signup-option'>Not a member? <a href="#" onClick={()=>changeRoute(2)}>Register</a> now</div>
</div>
}