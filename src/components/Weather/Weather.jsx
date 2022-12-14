import React, { useEffect, useState } from "react";
import axios from "axios";
import "./weather.css";
import wind from "./image/wind.png";
import humidity from "./image/humidity.png";

const weekday = [
	"SUNDAY",
	"MONDAY",
	"TUESDAY",
	"WEDNESDAY",
	"THURSDAY",
	"FRIDAY",
	"SATURDAY",
];

const d = new Date();
let day = weekday[d.getDay()];

export default function Weather({ coordinates }) {
	const [weather, setWeather] = useState("");
	const [city, setCity] = useState("");
	const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

	const apiCall = async (e) => {
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${apiKey}&units=metric`;
		const req = axios.get(url);
		const res = await req;
		setWeather({
			description: res.data.weather[0].description.toUpperCase(),
			icon: res.data.weather[0].icon,
			temp: Math.floor(res.data.main.temp),
			feels_like: Math.floor(res.data.main.feels_like),
			temp_min: Math.floor(res.data.main.temp_min),
			temp_max: Math.floor(res.data.main.temp_max),
			wind: res.data.wind.speed,
			city: res.data.name.toUpperCase(),
			humidity: res.data.main.humidity,
			press: res.data.main.pressure,
		});

		setCity(res.data.name);
	};

	useEffect(() => {
		apiCall();
	}, []);

	const handleWeatherIcon = () => {
		let url = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
		return <img src={url} alt={weather.icon} />;
	};
	return (
		<div className="weatherCard">
			<div className="row1">
				<div className="col1">{city}</div>
				<div className="col2">
					↑{weather.temp_max}° ↓{weather.temp_min}°
				</div>
			</div>
			<div className="row2">
				<div className="col1">
                    <div className="temperature">{weather.temp}°</div>
					<div className="weatherData" style={{ fontSize: "1.2rem" }}>
						{day}
					</div>
					<div className="weatherData">
						<img src={wind} alt="" /> {weather.wind} km/h
					</div>
					<div className="weatherData">
						<img src={humidity} alt="" /> {weather.humidity}%
					</div>
					<div className="weatherData">
						Feels Like: {weather.feels_like}°
					</div>
					<div className="weatherData">Degree Type: Celcius</div>
				</div>
				<div className="col2">
					{handleWeatherIcon()}
					<div style={{ fontSize: "1.3rem" }}>
						{weather.description}
					</div>
				</div>
			</div>
		</div>
	);
}

//https://api.openweathermap.org/data/2.5/weather?lat=35.63304002534157&lon=139.8803920509921&appid=6fc2d866008ab22cb737eb0937e4899d&units=metric
