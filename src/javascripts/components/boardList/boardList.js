import boardComponent from '../board/board';
import boardData from '../../helpers/data/boardData';
import singleBoard from '../singleBoard/singleBoard';
import utils from '../../helpers/utils';

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

      $('body').on('click', '.board-card', singleBoard.buildBoard);
    })
    .catch((err) => console.error('Get Boards BROKE! :(', err));
};

export default {
  buildBoards,
};
