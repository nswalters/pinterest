import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getBoards = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/board.json`)
    .then((response) => {
      const boardObjects = response.data;
      const boards = [];
      Object.keys(boardObjects).forEach((boardId) => {
        boardObjects[boardId].id = boardId;
        boards.push(boardObjects[boardId]);
      });
      resolve(boards);
    })
    .catch((err) => reject(err));
});

const getBoardById = (boardId) => axios.get(`${baseUrl}/board/${boardId}.json`);

export default {
  getBoards,
  getBoardById,
};
