import React, { useEffect, useState } from "react";
import {useLoadScript} from "@react-google-maps/api";
import Map from "./components/Map/Map";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

//ROUTE: SIGN IN: 1, REGISTER: 2, HOME: 3
const curDate = new Date();

var date = curDate.getDate() + "/" + (curDate.getMonth()+1)  + "/" + curDate.getFullYear();
var time = curDate.getHours() + ":" + curDate.getMinutes() + ":" + curDate.getSeconds();
const database = {
    name: 'vi',
    currentLocation:'',
    pastLocations:[{
        placeID: 1,
        count: 0
    }],
    date: date,
    time: time
}

export default function App (){
    const [state,setState] = useState({
        route: 1,
        isSignedIn: false
    })
    const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	});
    const changeRoute = (num) => {
        setState({route:num})
    }
    return (state.route === 1 ? <SignIn changeRoute={changeRoute}/> : state.route === 2 ? <Register changeRoute={changeRoute}/> : <Map isLoaded={isLoaded} date = {date} time = {time}/>)
}
