import utils from '../../helpers/utils';

const showNewBoardForm = () => {
  const domString = `
  <h2>Add a Board</h2>
  <form>
    <div class="form-group">
      <label for="form-board-name">Board Name</label>
      <input type="text" class="form-control" id="form-board-name" placeholder="Enter name of new board">
    </div>
    <button type="submit" class="btn btn-primary form-add-board-btn">Add Board!</button>
  </form>
  `;

  utils.printToDom('#formArea', domString);
};

export default {
  showNewBoardForm,
};
