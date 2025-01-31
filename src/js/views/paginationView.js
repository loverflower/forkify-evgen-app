import icons from 'url:../../img/icons.svg';

import View from './../views/view.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  adddHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this.data.page;

    const numPages = Math.ceil(
      this.data.results.length / this.data.resaultsPerPage
    );

    // page 1 there are other pages

    if (currentPage === 1 && numPages > 1) {
      return ` <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }
    // page 1 there no other pages
    //Last page

    if (currentPage === numPages && numPages > 1) {
      return `<button data-goto="${
        currentPage - 1
      }"class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>`;
    }
    // Other page
    if (currentPage < numPages) {
      return `
      <button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
      <button  data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
        <span> Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }

    return ``;
  }
}
export default new PaginationView();
