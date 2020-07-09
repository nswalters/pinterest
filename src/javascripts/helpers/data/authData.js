import firebase from 'firebase/app';
import 'firebase/auth';
import boardList from '../../components/boardList/boardList';

const authDiv = $('#auth');
const logoutButton = $('#navbar-logout-button');
const homeDiv = $('#home');
const boardsDiv = $('#boards');
const singleBoardDiv = $('#single-board');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.addClass('hide');
      homeDiv.addClass('hide');
      logoutButton.removeClass('hide');
      boardsDiv.removeClass('hide');
      singleBoardDiv.removeClass('hide');

      boardList.buildBoards(user.uid);
    } else {
      boardsDiv.addClass('hide');
      logoutButton.addClass('hide');
      singleBoardDiv.addClass('hide');
      authDiv.removeClass('hide');
      homeDiv.removeClass('hide');
    }
  });
};

export default {
  checkLoginStatus,
};
