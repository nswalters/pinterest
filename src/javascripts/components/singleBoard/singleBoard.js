import smash from '../../helpers/data/smash';
import utils from '../../helpers/utils';

const buildBoard = (e) => {
  const boardId = e.target.closest('.card').id;

  smash.getSingleBoardWithPins(boardId)
    .then((board) => {
      console.error('Here is your board:', board);
      let domString = `
        <h2 class="text-center">Featured Board</h2>
        <div class="col-12">
          <div class="card text-white bg-dark border-0 rounded-0">
            <div class="card-header">Board ${board.name}</div>
            <h3 class="card-title">Pins:</h3>
            <div class="card-body">
      `;

      board.pins.forEach((pin) => {
        domString += `<h4 class="card-text">${pin.title}</h4>`;
        domString += `<p class="card-text">${pin.url}</p>`;
      });

      domString += '</div></div></div>';

      utils.printToDom('#single-board', domString);
    })
    .catch((err) => console.error('problem with single board', err));
};

export default {
  buildBoard,
};
