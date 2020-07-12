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

const deletePin = (pinId) => axios.delete(`${baseUrl}/pin/${pinId}.json`);

const addPin = (pinObj) => axios.post(`${baseUrl}/pin.json`, pinObj);

const updatePin = (pinId, pinObj) => axios.put(`${baseUrl}/pin/${pinId}.json`, pinObj);

const getPinById = (pinId) => axios.get(`${baseUrl}/pin/${pinId}.json`);

export default {
  getPins,
  deletePin,
  addPin,
  getPinById,
  updatePin,
};
