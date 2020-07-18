import firebase from 'firebase/app';
import 'firebase/auth';
import boardData from '../../helpers/data/boardData';
import utils from '../../helpers/utils';
import boardPinData from '../../helpers/data/boardPinData';
// import boardPinData from '../../helpers/data/boardPinData';

const movePinEvent = (e) => {
  const selectedBoard = $('.custom-select').children('option:selected').val();
  const selectedBoardId = $('.custom-select').children('option:selected').attr('data-new-board-id');
  console.error('SelectedBoard: ', selectedBoard);
  console.error('SelectedBoardId: ', selectedBoardId);

  const boardUid = e.target.closest('.form-move-pin-btn').getAttribute('data-boardid');
  const pinId = e.target.closest('.form-move-pin-btn').getAttribute('data-pinid');

  const newBoardPinObj = {
    boardUid,
    pinId,
  };

  boardPinData.getBoardPinIdByBoardUid(selectedBoardId)
    .then((boardPinId) => {
      boardPinData.updateBoardPins(boardPinId, newBoardPinObj)
        .then(() => {
          console.error('call to getBoardIdByPinId: ', boardPinId);
          console.error(newBoardPinObj);
          console.error('UpdatedBoardPins');
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error('error', err));
};

const showMovePin = (e) => {
  const userId = firebase.auth().currentUser.uid;
  const boardId = e.target.closest('.move-pin').getAttribute('data-boardid');
  const pinId = e.target.closest('.move-pin').getAttribute('data-pinid');
  console.error('boardId: ', boardId);
  console.error('pinId: ', pinId);

  boardData.getBoards()
    .then((boards) => {
      console.error(boards);
      let domString = `
      <h2>Move to Board</h2>
      <div class="input-group">
        <select class="custom-select" id="movePinSelect">
      `;

      boards.forEach((board) => {
        if (board.id !== boardId) {
          if (userId === board.userId) {
            console.error(board.id);
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
