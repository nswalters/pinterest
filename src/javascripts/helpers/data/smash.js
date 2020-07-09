import boardData from './boardData';
import boardPinData from './boardPinData';
import pinData from './pinData';

const getSingleBoardWithPins = (boardId) => new Promise((resolve, reject) => {
  boardData.getBoardById(boardId)
    .then((response) => {
      const board = response.data;
      board.id = boardId;
      board.pins = [];

      // get all of the boardPins using the board.id
      boardPinData.getBoardPinsByBoardId(board.boardId).then((boardPins) => {
        // get all of the pins
        pinData.getPins().then((allPins) => {
          // add the boards owned pins to board.pins[]
          boardPins.forEach((boardPin) => {
            const pin = allPins.find((p) => p.id === boardPin.pinId);
            board.pins.push(pin);
          });
          resolve(board);
        });
      });
    })
    .catch((err) => reject(err));
});

export default {
  getSingleBoardWithPins,
};
