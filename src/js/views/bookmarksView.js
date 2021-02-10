import View from './view';
import previewview from './previewView';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _errorMessage = 'CHOOOOOOSEE!';
  _message = '';
  _parentElement = document.querySelector('.bookmarks__list');

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    console.log(this.data);
    const m = this.data.map(res => {
      return previewview.render(res, false);
    });

    return m;
  }
}
export default new BookmarksView();
