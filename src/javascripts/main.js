import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/auth/auth';
import authData from './helpers/data/authData';
import myNavbar from './components/myNavbar/myNavbar';
import boardList from './components/boardList/boardList';
import singleBoard from './components/singleBoard/singleBoard';
import newPin from './components/newPin/newPinForm';
import editPin from './components/editPin/editPinForm';

import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  authData.checkLoginStatus();
  auth.loginButton();
  myNavbar.logoutEvent();

  // Adding event listeners here to avoid issues with creating multiple
  // event listeners for the same action resulting in duplicates
  // when the dom is being re-built
  $('body').on('click', '.form-add-board-btn', boardList.addBoardEvent);
  $('body').on('click', '.delete-board', boardList.removeBoardEvent);
  $('body').on('click', '.add-board-btn', boardList.showAddBoardForm);
  $('body').on('click', '.add-pin', newPin.showNewPinForm);
  $('body').on('click', '.form-add-pin-btn', singleBoard.addPinEvent);
  $('body').on('click', '.form-edit-pin-btn', singleBoard.editPinEvent);
  $('body').on('click', '.board-card', singleBoard.buildBoard);
  $('body').on('click', '.delete-pin', singleBoard.removePinEvent);
  $('body').on('click', '.edit-pin', editPin.showEditPinForm);
};

init();
