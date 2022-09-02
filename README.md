# Check In
<img alt="Web Demo" src="https://user-images.githubusercontent.com/106452170/188200882-e930fdc6-b848-4c18-ac9f-c52da9c9fdd9.png">


# Table of Contents

1. [About The Project](#about-the-project)
    * [APIs](#apis)
    * [Built with](#built-with)
    * [Packages](#packages)
2. [Getting Started](#getting-started)
    * [Installation](#installation)
3. [Author](#author)
4. [Avaiable Scripts](#avaiable-scripts)


## About The Project
This Web Application helps user check in 

### APIs:
- Geocoding
- Google Maps API
- Weather API 

### Built with: 
- ReactJS
- JavaScript

### Packages
- [@react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api)
- [axios](https://www.npmjs.com/package/axios)

## Getting Started
To get a local copy up and running follow these simple example steps.

### Installation

1. Get a free Google Maps API Key at [Geocoding](https://developers.google.com/maps/documentation/geocoding/overview)
2. Get a free Weather API Key at [OpenWeather](https://openweathermap.org/current)
3. Clone the repo
```
git clone https://github.com/vitdoan/Check-In.git
```
4. Install NPM packages
```
npm install
```
5. Enter your API in your `.env`
```
REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_API_KEY
REACT_APP_WEATHER_API_KEY=YOUR_API_KEY
```

## Author

👤 **Vi Doan**

* Website: http://vitdoan.herokuapp.com/

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
