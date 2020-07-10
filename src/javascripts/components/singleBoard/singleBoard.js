import pinData from '../../helpers/data/pinData';
import smash from '../../helpers/data/smash';
import utils from '../../helpers/utils';

const removePinEvent = (e) => {
  const pinId = e.target.closest('.delete-pin').id;

  // delete pin from database
  pinData.deletePin(pinId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildBoard(e);
    })
    .catch((err) => console.error('could not delete pin', err));
};

const buildBoard = (e) => {
  // If the 'delete board' button was clicked
  // then we don't build the single board
  const deleteBoardSelected = e.target.closest('.delete-board');
  if (deleteBoardSelected) {
    return;
  }

  const boardId = e.target.closest('.card').id;

  smash.getSingleBoardWithPins(boardId)
    .then((board) => {
      let domString = `
        <h2 class="text-center">Featured Board</h2>
        <div class="col-12">
          <div class="card text-white bg-dark border-0 rounded-0" id="${board.id}">
            <div class="card-header">Board ${board.name}</div>
            <h3 class="card-title">Pins:</h3>
            <div class="card-body">
      `;

      board.pins.forEach((pin) => {
        if (pin) {
          domString += `<h4 class="card-text">${pin.title}</h4>`;
          domString += `<p class="card-text">${pin.url}</p>`;
          domString += `<button class="btn btn-danger delete-pin" id=${pin.id}><i class="far fa-trash-alt">Delete Pin</i></button>`;
        }
      });

      domString += '</div></div></div>';

      utils.printToDom('#single-board', domString);
      $('body').one('click', '.delete-pin', removePinEvent);
    })
    .catch((err) => console.error('problem with single board', err));
};

export default {
  buildBoard,
};
