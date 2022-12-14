import React, { useEffect, useMemo, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Stats from "../Stats/Stats";
import "./map.css";
import Geocode from "react-geocode";
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

export default function Map({ isLoaded, handleCheckIn, count, timeDate, prevVisit }) {
	let [coordinates, setCoordinates] = useState({ lat: 35.633, lng: 139.8804 });
	let [isEnabled, setEnable] = useState(false);
	let [address, setAddress] = useState("");
	let [place_id, setPlaceId] = useState("");

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => {
				if (latitude && longitude) {
					setEnable(true);
					//35.632817899835295, 139.88038356915683
					// setCoordinates({ lat: 35.6328, lng: 139.88038})
					setCoordinates({ lat: latitude, lng: longitude });
				}
			}
		);
	},[]);

	if (!isEnabled || !isLoaded) {
		return (
			<div className="lds-facebook">
				<div></div>
				<div></div>
				<div></div>
			</div>
		);
	}

	Geocode.fromLatLng(coordinates.lat, coordinates.lng).then(
		(response) => {
			let data = response.results[0];
			const address = data.formatted_address;
			setAddress(address);
			setPlaceId(data.place_id);
			console.log(data.place_id);
		},
		(error) => {
			console.error(error);
		}
	);

	return (
		<div
			className="body-container"
			style={{
				display: "grid",
				columnGap: "10px",
				gridTemplateColumns: "2fr 1.1fr",
			}}
		>
			<GoogleMap
				mapContainerClassName="map-container"
				zoom={21}
				center={coordinates}
				options={{
					zoomControl: true,
				}}
			>
				<Marker
					mapContainerClassName="map-marker"
					position={coordinates}
				/>
			</GoogleMap>
			<Stats coordinates={coordinates} address={address} place_id={place_id} handleCheckIn={handleCheckIn} count={count} timeDate={timeDate} prevVisit={prevVisit}/>
		</div>
	);
}
