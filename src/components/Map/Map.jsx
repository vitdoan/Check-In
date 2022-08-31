import React, { useEffect, useMemo, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Stats from "../Stats/Stats";
import "./map.css";
import Geocode from "react-geocode";
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

export default function Map({ isLoaded, date, time }) {
	let [coordinates, setCoordinates] = useState({ lat: 35.67, lng: 139.65 });
	let [isEnabled, setEnable] = useState(false);
    let [address, setAddress] = useState('');

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => {
				if (latitude && longitude) {
					setEnable(true);
					setCoordinates({ lat: latitude, lng: longitude });
				}
			}
		);
	}, []);

	if (!isEnabled || !isLoaded) {
		return (
			<div className='loading'>
				<h1>Loading...</h1>
			</div>
		);
	}

	Geocode.fromLatLng(coordinates.lat, coordinates.lng).then(
		(response) => {
		  const address = response.results[0].formatted_address;
		  console.log(address);
		  setAddress(address);
		},
		(error) => {
		  console.error(error);
		}
	  );

	return (
		<div className="body-container" style={{display: 'grid', columnGap: '10px', gridTemplateColumns: '3fr 1fr'}}>
			<GoogleMap
			mapContainerClassName="map-container"
			zoom={21}
			center={coordinates}
			options={{
				zoomControl: true,
			}}
		>
			<Marker mapContainerClassName="map-marker" position={coordinates} />
			</GoogleMap>
			<Stats date = {date} time = {time} address={address} />
		</div>
	);
}
