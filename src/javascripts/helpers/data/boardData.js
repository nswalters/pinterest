import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getBoards = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/board.json`)
    .then((response) => {
      const boardObjects = response.data;
      const boards = [];

      if (boardObjects) {
        Object.keys(boardObjects).forEach((boardId) => {
          // add the id onto each object
          boardObjects[boardId].id = boardId;

          // put the object onto the boards array
          boards.push(boardObjects[boardId]);
        });
      }
      resolve(boards);
    })
    .catch((err) => reject(err));
});

export default {
  getBoards,
};
