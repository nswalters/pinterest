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

const deleteBoard = (boardId) => axios.delete(`${baseUrl}/board/${boardId}.json`);

const addBoard = (boardObj) => axios.post(`${baseUrl}/board.json`, boardObj);

export default {
  getBoards,
  getBoardById,
  deleteBoard,
  addBoard,
};
