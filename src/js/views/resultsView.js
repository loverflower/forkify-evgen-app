import View from './view';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView';
class ResultsView extends View {
  _errorMessage = 'CHHOSE BOOK!!!!';
  _message = '';
  _parentElement = document.querySelector('.results');

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return this.data
      .map(res => {
        return previewView.render(res, false);
      })
      .join('');
  }
}
export default new ResultsView();
