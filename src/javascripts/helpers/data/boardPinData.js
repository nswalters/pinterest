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

// Delete Board Pins Record
const deleteBoardPins = (boardPinsId) => axios.delete(`${baseUrl}/boardPins/${boardPinsId}.json`);

export default {
  getBoardPinsByBoardId,
  deleteBoardPins,
};
