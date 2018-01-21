// -------------------------------------------------
// Dependencies
// -------------------------------------------------
import axios from "axios";

function getWeather(address) {
  return new Promise((resolve, reject) => {
    getGeoCode(address)
      .then(({ lat, lng }) => {
        const weatherAPI = "https://api.darksky.net/forecast/";
        const APIKey = "c20cb927d0032606123ed71616ab432e";

        axios
          .get(`${weatherAPI}${APIKey}/${lat},${lng}`)
          .then(response => resolve(response.data));
      })
      .catch(error => {
        if (error.code === "ENOTFOUND") {
          reject(new Error("Unable to connect to Google Servers"));
        } else {
          reject(error.message);
        }
      });
  });
}

function getGeoCode(address) {
  return new Promise((resolve, reject) => {
    const encodedAddress = encodeURIComponent(address);
    const googleMapsAPI = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

    axios
      .get(googleMapsAPI)
      .then(response => {
        if (response.data.status === "ZERO_RESULTS") {
          reject(new Error("Unable to find that address"));
        }
        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;

        resolve({ lat, lng });
      })
      .catch(error => reject(error));
  });
}

export default getWeather;
