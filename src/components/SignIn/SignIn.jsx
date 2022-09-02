import React, { useState } from 'react';
import './signin.css';
import google from './images/google.png';
import facebook from './images/facebook.png';

export default function SignIn({changeRoute, loadUser}) {
    let [userName, setUsername] = useState('');
    let [password, setPassword] = useState('');

    const onUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const onSubmitSignIn = () => {
        fetch('http://localhost:3001/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username:userName,
                password:password
            })
        })
        .then(response => response.json())
        .then(data=>{
            if(data){
                loadUser(data);
                changeRoute(3);
            }
            else {

            }
        })
    }

    return <div className="login">
    <h1>Welcome Back!</h1>
  <input type="text" placeholder="Username" onChange={onUsernameChange} className='username'/>
  <input type="password" placeholder="Password" onChange={onPasswordChange} className='password'/>
  <button className='loginButton' onClick={onSubmitSignIn}>Sign In</button>
  <div className='signup-option'>Or you can</div>
  <div className='third-parties' onClick={onSubmitSignIn}>
    <div className='ggButton'>
        <div className='logo'>
            <img src={google} alt='google'/>
        </div>
        <div className='text'>Sign In with Google</div>
    </div>
    <div className='ggButton'>
        <div className='logo'>
            <img src={facebook} alt='facebook'/>
        </div>
        <div className='text'>Sign In with Facebook</div>
    </div>
  </div>
  <div className='signup-option'>Not a member? <a href="#" onClick={()=>changeRoute(2)}>Register</a> now</div>
</div>
}