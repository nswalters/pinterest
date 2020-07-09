import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getPins = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pin.json`)
    .then((response) => {
      const pinObjects = response.data;
      const pins = [];
      Object.keys(pinObjects).forEach((pinId) => {
        pinObjects[pinId].id = pinId;

        pins.push(pinObjects[pinId]);
      });
      resolve(pins);
    })
    .catch((err) => reject(err));
});

// const getPinById = (pinId) => axios.get(`${baseUrl}/pin/${pinId}.json`);

// Add deletePin function later

export default {
  getPins,
  // getPinById,
};