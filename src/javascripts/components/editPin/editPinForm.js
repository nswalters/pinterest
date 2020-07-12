import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';

// create the edit pin form and show in dom (#formArea)
const showEditPinForm = (e) => {
  e.preventDefault();
  const pinId = e.target.closest('.edit-pin').getAttribute('data-id');
  pinData.getPinById(pinId)
    .then((response) => {
      const editedPin = response.data;

      const domString = `
        <h2>Edit Pin</h2>
        <form>
          <div class="form-group">
            <label for="pin-title">Pin Title</label>
            <input type="text" class="form-control" id="pin-title" value="${editedPin.title}">
          </div>
          <div class="form-group">
            <label for="pin-url">Pin URL</label>
            <input type="text" class="form-control" id="pin-url" value="${editedPin.url}">
          </div>
          <button type="submit" class="btn btn-primary form-edit-pin-btn" data-id="${pinId}">Update Pin</button>
        </form>
        `;

      utils.printToDom('#formArea', domString);
    });
};

export default {
  showEditPinForm,
};
