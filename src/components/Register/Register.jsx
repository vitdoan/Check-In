import React from 'react';
import '../SignIn/signin.css'

export default function Register({changeRoute}) {
    return <div className="login">
  <input type="text" placeholder="Name" className='name'/>
  <input type="text" placeholder="Username" className='username'/>
  <input type="password" placeholder="Password" className='password'/>
  <button className='loginButton' onClick={()=>changeRoute(3)}>Register</button>
</div>
}