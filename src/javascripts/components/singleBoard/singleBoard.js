import boardPinData from '../../helpers/data/boardPinData';
import pinData from '../../helpers/data/pinData';
import smash from '../../helpers/data/smash';
import utils from '../../helpers/utils';

const editPinEvent = (e) => {
  e.preventDefault();
  const editedPinObj = {
    title: $('#pin-title').val(),
    url: $('#pin-url').val(),
  };

  const pinId = $('.form-edit-pin-btn').attr('data-id');

  pinData.updatePin(pinId, editedPinObj)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildBoard(e);
    })
    .catch((err) => console.error('Unable to update pin', err));
};

const addPinEvent = (e) => {
  e.preventDefault();

  const newPinObj = {
    title: $('#pin-title').val(),
    url: $('#pin-url').val(),
  };

  const boardId = $('.form-add-pin-btn').attr('data-id');

  pinData.addPin(newPinObj)
    .then(({
      data,
    }) => {
      const newBoardPinObj = {
        boardUid: boardId,
        pinId: data.name,
      };
      boardPinData.addBoardPins(newBoardPinObj);

      // eslint-disable-next-line no-use-before-define
      buildBoard(e);
    })
    .catch((err) => console.error('could not add pin', err));

  utils.printToDom('#formArea', '');
};

const removePinEvent = (e) => {
  const pinId = e.target.closest('.delete-pin').id;

  smash.cascadeDeletePin(pinId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildBoard(e);
    })
    .catch((err) => console.error('could not delete pin', err));
};

const buildBoard = (e) => {
  let boardId = '';
  // const boardId = e.target.closest('.card').id;
  if (e.target.closest('.card')) {
    boardId = e.target.closest('.card').id;
  } else {
    boardId = $('#single-board').find('.board-card')[0].id;
  }

  // If I don't click on the 'addPin','editPin', or 'moveBoard' button on a board
  // Then don't show the 'addPinForm', only show the single board
  const addPinSelected = e.target.closest('.add-pin');
  const editPinSelected = e.target.closest('.edit-pin');
  const movePinSelected = e.target.closest('.move-pin');
  if (!addPinSelected && !editPinSelected && !movePinSelected) {
    utils.printToDom('.context-area', '');
  }

  // If the 'delete board' button was clicked
  // then we don't build the single board
  const deleteBoardSelected = e.target.closest('.delete-board');
  if (deleteBoardSelected) {
    return;
  }

  smash.getSingleBoardWithPins(boardId)
    .then((board) => {
      let domString = `
        <h2 class="text-center">Featured Board</h2>
        <div class="col-12">
          <div class="card board-card text-white bg-dark border-0 rounded-0" id="${board.id}">
            <div class="card-header">${board.name}</div>
            <h3 class="card-title">Pins:</h3>
            <button class="btn btn-warning add-pin" data-id="${board.name}"><i class="fas fa-thumbtack">Add Pin</i></button>
            <div class="card-body">
      `;

      board.pins.forEach((pin) => {
        if (pin) {
          domString += `<h4 class="card-text">${pin.title}</h4>`;
          domString += `<p class="card-text">${pin.url}</p>`;
          domString += '<div class="d-flex flex-row justify-content-between mb-4">';
          domString += `<button class="btn btn-warning edit-pin" data-id=${pin.id}><i class="fas fa-edit">Edit Pin</i></button>`;
          domString += `<button class="btn btn-info move-pin" data-pinid=${pin.id} data-boardid=${board.id}><i class="fas fa-external-link-alt">Move to Board</i></button>`;
          domString += `<button class="btn btn-danger delete-pin" id=${pin.id}><i class="far fa-trash-alt">Delete Pin</i></button>`;
          domString += '</div>';
        }
      });

      domString += '</div></div></div>';

      utils.printToDom('#single-board', domString);
    })
    .catch((err) => console.error('problem with single board', err));
};

export default {
  buildBoard,
  addPinEvent,
  removePinEvent,
  editPinEvent,
};
