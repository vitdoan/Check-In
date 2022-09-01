import React, { useState } from "react";
import "../SignIn/signin.css";

export default function Register({ changeRoute, loadUser }) {
	let [userName, setUsername] = useState("");
	let [password, setPassword] = useState("");
	let [name, setName] = useState("");

	const onNameChange = (event) => {
		setName(event.target.value);
	};

	const onUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const onPasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const onSubmitRegister = () => {
		fetch("http://localhost:3001/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: name,
				username: userName,
				password: password,
			}),
		})
			.then(response => response.json())
			.then(data=>{
        if(data){
          loadUser(data);
          changeRoute(3);
        }
        else{

        }
      });
	};

	return (
		<div className="login">
      <h1>User Registration</h1>
			<input
				type="text"
				placeholder="Name"
				onChange={onNameChange}
				className="name"
			/>
			<input
				type="text"
				placeholder="Username"
				onChange={onUsernameChange}
				className="username"
			/>
			<input
				type="password"
				placeholder="Password"
				className="password"
				onChange={onPasswordChange}
			/>
			<button className="loginButton" onClick={onSubmitRegister}>
				Register
			</button>
      <div className='signup-option'>Back to <a href="#" onClick={()=>changeRoute(1)}>Sign In</a></div>
		</div>
	);
}
