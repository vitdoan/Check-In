import React from "react";
import "./stats.css";
import history from "./images/history.png";
import location from "./images/location.png";
import calendar from "./images/calendar.png";
import check from "./images/check.png";
import Weather from "../Weather/Weather";

export default function Stats({
	address,
	handleCheckIn,
	place_id,
	count,
	timeDate,
	prevVisit,
	coordinates,
}) {
	const handleTime = () => {
		if (timeDate && timeDate.length > 0) {
			let myDate = new Date(timeDate);
			let time =
				myDate.getHours() +
				":" +
				myDate.getMinutes() +
				":" +
				myDate.getSeconds();
			return time;
		}
		let curDate = new Date();
		let subTime =
			curDate.getHours() +
			":" +
			curDate.getMinutes() +
			":" +
			curDate.getSeconds();
		return subTime;
	};

	const handleDate = () => {
		if (timeDate && timeDate.length > 0) {
			let myDate = new Date(timeDate);
			let date =
				myDate.getDate() +
				"/" +
				(myDate.getMonth() + 1) +
				"/" +
				myDate.getFullYear();
			return date;
		}
		let curDate = new Date();
		let subDate =
			curDate.getDate() +
			"/" +
			(curDate.getMonth() + 1) +
			"/" +
			curDate.getFullYear();
		return subDate;
	};

	const handlePrevTime = () => {
		if (prevVisit === "none") {
			return "You have not been here before.";
		}
		if (prevVisit && prevVisit.length > 1) {
			return timeDiffCalc(new Date(prevVisit), new Date()) + " ago";
		}
		return "Check in to see";
	};

	return (
		<div className="StatsCard">
			<div className="addressCard">
				<h3>Address</h3>
				<p>{address}</p>
			</div>
			<div className="statsAndButtonContainer">
				<div className="statsContainer">
					<div className="stats">
						<img src={location} alt="visit" />
						<div className="statsDescription">
							<div className="num">{count}</div>
							<div className="text">Total visits</div>
						</div>
					</div>
					<div className="stats">
						<img src={calendar} alt="visit" />
						<div className="statsDescription">
							<div className="num">{handleDate()}</div>
							<div className="num2">at {handleTime()}</div>
							<div className="text">Current visit</div>
						</div>
					</div>
					<div className="stats">
						<img src={history} alt="visit" />
						<div className="statsDescription">
							<div className="num">{handlePrevTime()}</div>
							<div className="text">Last visit</div>
						</div>
					</div>
				</div>
				<button onClick={() => handleCheckIn(place_id)}>
					{/* <div>Check</div>
					<div>In</div> */}
					<img src={check} alt="" />
				</button>
			</div>
			<Weather coordinates={coordinates} />
		</div>
	);
}

function timeDiffCalc(dateFuture, dateNow) {
	let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

	// calculate days
	const days = Math.floor(diffInMilliSeconds / 86400);
	diffInMilliSeconds -= days * 86400;

	// calculate hours
	const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
	diffInMilliSeconds -= hours * 3600;

	// calculate minutes
	const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
	diffInMilliSeconds -= minutes * 60;

	let difference = "";
	if (days > 0) {
		difference += days === 1 ? `${days} day, ` : `${days} days, `;
	}
	difference +=
		hours === 0 || hours === 1 ? `${hours} hour, ` : `${hours} hours, `;

	difference +=
		minutes === 0 || hours === 1
			? `${minutes} minutes`
			: `${minutes} minutes`;

	return difference;
}
