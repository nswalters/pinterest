const boardMaker = (board) => {
  const domString = `
  <div class="col-3">
    <div class="card border-0 rounded-0 bg-dark text-light" id=${board.boardId}>
      <div class="card-header text-center">${board.name}</div>
      <div class="card-body">
        <h5 class="card-title">Pins will go here</h5>
      </div>
    </div>
  </div>
  `;

  return domString;
};

export default {
  boardMaker,
};
