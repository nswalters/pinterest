import firebase from 'firebase/app';
import 'firebase/auth';
import boardComponent from '../board/board';
import boardData from '../../helpers/data/boardData';
import newPin from '../newPin/newPinForm';
import singleBoard from '../singleBoard/singleBoard';
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

const buildBoards = (userId) => {
  boardData.getBoards()
    .then((boards) => {
      let domString = `
      <h2 class="text-center">Boards</h2>
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

      $('body').one('click', '.delete-board', removeBoardEvent);
      $('body').on('click', '.board-card', singleBoard.buildBoard);
      $('body').one('click', '.add-pin', newPin.showNewPinForm);
      $('body').on('click', '.form-add-pin-btn', singleBoard.addPinEvent);
    })
    .catch((err) => console.error('Get Boards BROKE! :(', err));
};

export default {
  buildBoards,
};
