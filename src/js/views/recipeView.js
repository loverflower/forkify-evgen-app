import icons from 'url:../../img/icons.svg';
import fractional from 'fractional';
import View from './../views/view.js';

class RecipeView extends View {
  _errorMessage = 'we couldnt find this recipe';
  _message = '';
  _parentElement = document.querySelector('.recipe');

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      console.log(btn);
      const updateTo = +btn.dataset.updateTo;
      console.log(updateTo);
      if (updateTo > 0) handler(updateTo);
    });
  }

  addHandleAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const bookmark = e.target.closest('.btn--bookmark');
      if (!bookmark) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
    <figure class="recipe__fig">
    <img src="${this.data.image}" alt="${
      this.data.title
    }" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this.data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this.data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this.data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--update-servings" data-update-to ="${
          this.data.servings - 1
        }">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--update-servings" data-update-to ="${
          this.data.servings + 1
        }">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated ${this.data.key ? '' : 'hidden'}" >
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round btn--bookmark">
      <svg class="">
        <use href="${icons}#icon-bookmark${
      this.data.bookmarked ? '-fill' : ''
    }"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${this.data.ingredients.map(this._generateIngridient).join('')}
    

    
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this.data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this.data.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>
  `;
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].map(el => window.addEventListener(el, handler));
  }
}
export default new RecipeView();