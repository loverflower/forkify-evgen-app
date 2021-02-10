import icons from 'url:./../../img/icons.svg';
export default class View {
  newDomer;
  data;
  render(data, cond = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this.data = data;
    console.log(this.data);
    const markUp = this._generateMarkup();

    if (!cond) {
      return markUp;
    }

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  update(data) {
    this.data = data;
    const newMarkUp = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkUp);
    const m = { newDom };
    console.log(m);
    const newElement = Array.from(newDom.querySelectorAll('*'));
    console.log(newElement);
    const currentElement = Array.from(
      this._parentElement.querySelectorAll(`*`)
    );

    newElement.forEach((newEl, i) => {
      ///update text
      const curEl = currentElement[i];
      if (!newEl.isEqualNode(curEl) && curEl.firstChild?.nodeValue.trim()) {
        curEl.textContent = newEl.textContent;
      }
      ///update atribures
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner() {
    this._clear();
    const spinner = `
        <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg
      </div>`;
    this._parentElement.insertAdjacentHTML('afterbegin', spinner);
  }

  renderErrorThis() {
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', this.newDomer);
  }

  renderError(message = this._errorMessage) {
    const markup = `
     <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
     `;
    this.newDomer = `${this._parentElement.innerHTML}`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    setTimeout(this.renderErrorThis.bind(this), 4000);
  }

  _generateIngridient(ing) {
    return `
    <li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${
      ing.quantity ? new Fraction(ing.quantity).toString() : ''
    }</div>
    <div class="recipe__description">
      <span class="recipe__unit">${ing.unit}</span>
      ${ing.description}
    </div>
  </li>
    `;
  }
}
