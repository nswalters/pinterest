import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getBoardPinsByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boardPins.json?orderBy="boardUid"&equalTo="${boardId}"`)
    .then((response) => {
      const boardPinsObj = response.data;
      const boardPins = [];
      Object.keys(boardPinsObj).forEach((boardPinId) => {
        boardPinsObj[boardPinId].id = boardPinId;
        boardPins.push(boardPinsObj[boardPinId]);
      });
      resolve(boardPins);
    })
    .catch((err) => reject(err));
});

const getBoardPinsByPinId = (pinId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boardPins.json?orderBy="pinId"&equalTo="${pinId}"`)
    .then((response) => {
      const boardPinsObj = response.data;
      const boardPins = [];
      Object.keys(boardPinsObj).forEach((boardPinId) => {
        boardPinsObj[boardPinId].id = boardPinId;
        boardPins.push(boardPinsObj[boardPinId]);
      });
      resolve(boardPins);
    })
    .catch((err) => reject(err));
});

const getBoardIdByPinId = (pinId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boardPins.json?orderBy="pinId"&equalTo="${pinId}"`)
    .then((response) => {
      const boardObj = response.data;
      const boardPinId = Object.keys(boardObj)[0];
      resolve(boardPinId);
    })
    .catch((err) => reject(err));
});

const getBoardPinIdByBoardUid = (boardUid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boardPins.json?orderBy="boardUid"&equalTo="${boardUid}"`)
    .then((response) => {
      const boardObj = response.data;
      const boardPinId = Object.keys(boardObj)[0];
      resolve(boardPinId);
    })
    .catch((err) => reject(err));
});

// Delete Board Pins Record
const deleteBoardPins = (boardPinsId) => axios.delete(`${baseUrl}/boardPins/${boardPinsId}.json`);

// Add new board pins record
const addBoardPins = (boardPinsObj) => axios.post(`${baseUrl}/boardPins.json`, boardPinsObj);

const updateBoardPins = (boardPinId, boardPinsObj) => axios.put(`${baseUrl}/boardPins/${boardPinId}.json`, boardPinsObj);

export default {
  getBoardIdByPinId,
  getBoardPinsByBoardId,
  getBoardPinsByPinId,
  getBoardPinIdByBoardUid,
  deleteBoardPins,
  addBoardPins,
  updateBoardPins,
};
