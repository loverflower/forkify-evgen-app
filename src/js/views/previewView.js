import View from './view';
import icons from 'url:../../img/icons.svg';
class Previewview extends View {
  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return `
        <li class="preview">
        <a class="preview__link ${
          id == this.data.id ? 'preview__link--active' : ''
        } " href="#${this.data.id}">
          <figure class="preview__fig">
            <img src="${this.data.image}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${this.data.title}</h4>
            <p class="preview__publisher">${this.data.publisher}</p>
            <div class="preview__user-generated ${
              this.data.key ? '' : 'hidden'
            }">
              <svg>
                <use href="${icons}#icon-user "></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
          `;
  }
}
export default new Previewview();
