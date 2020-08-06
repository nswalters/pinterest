import firebase from 'firebase/app';
import 'firebase/auth';
import boardData from '../../helpers/data/boardData';
import utils from '../../helpers/utils';
import boardPinData from '../../helpers/data/boardPinData';
import singleBoard from '../singleBoard/singleBoard';

const movePinEvent = (e) => {
  const selectedBoardId = $('.custom-select').children('option:selected').attr('data-new-board-id');
  const boardUid = e.target.closest('.form-move-pin-btn').getAttribute('data-boardid');
  const pinId = e.target.closest('.form-move-pin-btn').getAttribute('data-pinid');

  const newBoardPinObj = {
    boardUid: selectedBoardId,
    pinId,
  };

  boardPinData.getBoardPinIdByBoardUid(boardUid)
    .then((boardPinId) => {
      boardPinData.updateBoardPins(boardPinId, newBoardPinObj)
        .then(() => {
          singleBoard.buildBoard(e);
        });
    })
    .catch((err) => console.error('error', err));
};

const showMovePin = (e) => {
  const userId = firebase.auth().currentUser.uid;
  const boardId = e.target.closest('.move-pin').getAttribute('data-boardid');
  const pinId = e.target.closest('.move-pin').getAttribute('data-pinid');

  boardData.getBoards()
    .then((boards) => {
      let domString = `
      <h2>Move to Board</h2>
      <div class="input-group">
        <select class="custom-select" id="movePinSelect">
      `;

      boards.forEach((board) => {
        if (board.id !== boardId) {
          if (userId === board.userId) {
            domString += `
            <option data-new-board-id="${board.id}" value="${board.name}">${board.name}</option>
            `;
          }
        }
      });

      domString += '</select></div>';
      domString += `<button class="btn btn-primary form-move-pin-btn" data-boardid=${boardId} data-pinid=${pinId}>Move Pin</button>`;

      utils.printToDom('#formArea', domString);
    })
    .catch((err) => console.error("Can't show boards to move pin", err));
};

export default {
  showMovePin,
  movePinEvent,
};
