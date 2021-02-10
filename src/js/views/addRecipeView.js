import icons from 'url:../../img/icons.svg';

import View from './../views/view.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfuly uploaded';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _closeArr = [this._btnClose, this._overlay];
  constructor() {
    super();
    this._toogleWindow();

    // this._closeWindow();
    this._closeWindows();
  }
  _generateMarkup() {}

  toogleWindiw() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _closeWindow(el) {
    el.addEventListener('click', this.toogleWindiw.bind(this));
  }

  _toogleWindow() {
    this._btnOpen.addEventListener('click', this.toogleWindiw.bind(this));
  }

  _closeWindows() {
    this._closeArr.forEach(this._closeWindow.bind(this));
  }

  _addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);

      handler(data);
    });
  }
}
export default new AddRecipeView();
