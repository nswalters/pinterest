import firebase from 'firebase/app';
import 'firebase/auth';
import boardComponent from '../board/board';
import boardData from '../../helpers/data/boardData';
import newBoard from '../newBoard/newBoardForm';
import utils from '../../helpers/utils';
import smash from '../../helpers/data/smash';

const removeBoardEvent = (e) => {
  const boardId = e.target.closest('.card').id;

  smash.cascadeDeleteBoard(boardId)
    .then(() => {
      const userId = firebase.auth().currentUser.uid;
      // eslint-disable-next-line no-use-before-define
      buildBoards(userId);

      // Clear the context-area dom sections after we've deleted a board
      utils.printToDom('.context-area', '');
    })
    .catch((err) => console.error('could not delete board', err));
};

const addBoardEvent = (e) => {
  e.preventDefault();

  const userId = firebase.auth().currentUser.uid;

  const newBoardObj = {
    name: $('#form-board-name').val(),
    userId,
  };

  boardData.addBoard(newBoardObj)
    .then(() => {
      utils.printToDom('#formArea', '');
      // eslint-disable-next-line no-use-before-define
      buildBoards(userId);
    })
    .catch((err) => console.error('Could not add board', err));
};

const showAddBoardForm = () => {
  newBoard.showNewBoardForm();
};

const buildBoards = (userId) => {
  boardData.getBoards()
    .then((boards) => {
      let domString = `
      <h2 class="text-center">Boards</h2>
      <button class="btn btn-primary add-board-btn d-block mx-auto mb-5">Add a Board</button>
      <div class="d-flex flex-wrap">
      `;

      boards.forEach((board) => {
        // Only add boards that belong to the user
        if (userId === board.userId) {
          domString += boardComponent.boardMaker(board);
        }
      });

      domString += '</div>';

      utils.printToDom('#boards', domString);
    })
    .catch((err) => console.error('Get Boards BROKE! :(', err));
};

export default {
  buildBoards,
  removeBoardEvent,
  addBoardEvent,
  showAddBoardForm,
};
