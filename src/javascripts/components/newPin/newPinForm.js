import utils from '../../helpers/utils';

// create new pin form and show in dom (#formArea)
const showNewPinForm = (e) => {
  const boardId = e.target.closest('.board-card').id;
  const boardName = e.target.closest('.add-pin').getAttribute('data-id');

  const domString = `
  <h2>Add A Pin</h2>
  <form>
    <div class="form-group">
      <label for="pin-title">Pin Title</label>
      <input type="text" class="form-control" id="pin-title" placeholder="Enter title of pin">
    </div>
    <div class="form-group">
      <label for="pin-url">Pin URL</label>
      <input type="text" class="form-control" id="pin-url" placeholder="URL">
    </div>
    <div class="form-group">
      <label for="boardId">Board that Pin will be added to:</label>
      <input id="boardId" class="form-control" type="text" placeholder="${boardName}" readonly>
    </div>
    <button type="submit" class="btn btn-primary form-add-pin-btn" data-id="${boardId}">Pin It!</button>
  </form>
`;

  utils.printToDom('#formArea', domString);
};

export default {
  showNewPinForm,
};
