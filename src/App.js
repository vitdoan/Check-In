import React, { useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import Map from "./components/Map/Map";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

//ROUTE: SIGN IN: 1, REGISTER: 2, HOME: 3
const curDate = new Date();

var date =
	curDate.getDate() +
	"/" +
	(curDate.getMonth() + 1) +
	"/" +
	curDate.getFullYear();
var time =
	curDate.getHours() +
	":" +
	curDate.getMinutes() +
	":" +
	curDate.getSeconds();

export default function App() {
	const [state, setState] = useState({
		route: 1,
		isSignedIn: false,
	});
	const [user, setUser] = useState({
		id: "",
		name: "",
		username: "",
		// visits: 0,
		joined: "",
        places: []
	});
    const [count, setCount] = useState('Check in to see');
    const [timeDate, setTimeDate] = useState('');
    const [prevVisit, setPrevVisit] = useState('');

	const loadUser = (data) => {
		setUser({
			id: data.id,
			name: data.name,
			username: data.username,
			joined: data.joined,
            places: data.places
		});
        console.log('user is loaded');
	};

    const handleCheckIn = (place_id) => {
        fetch("http://localhost:3001/visits", {
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							id: user.id,
                            place_id: place_id,
						}),
					})
					.then(response => response.json())
					.then(data=>{
                        setUser(prev=>({
                        id: prev.id,
                        name: prev.name,
                        username:prev.username,
                        joined: prev.joined,
                        places: data,
                    }))
                    setCount(data.numVisits);
                    setTimeDate(data.lastVisit);
                    setPrevVisit(data.prevVisit);
                    });
    }

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	});
	const changeRoute = (num) => {
		setState({ route: num });
	};

    console.log(user);

	return state.route === 1 ? (
		<SignIn changeRoute={changeRoute} loadUser={loadUser}/>
	) : state.route === 2 ? (
		<Register changeRoute={changeRoute} loadUser={loadUser} />
	) : (
		<Map isLoaded={isLoaded} date={date} time={time} handleCheckIn={handleCheckIn} count={count} timeDate={timeDate} prevVisit={prevVisit}/>
	);
}
