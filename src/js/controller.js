import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './../js/views/searchView.js';
import resultsViews from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkersView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';
import 'core-js/stable'; ///polyfiilling map, filter and another modern method
import 'regenerator-runtime/runtime'; ////polyfiling async

// https://forkify-api.herokuapp.com/v2

////////////////render spinner/////

///////////////////////////////////////
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    await model.loadRecipe(id);
    bookmarkersView.render(model.state.bookmarks);
    recipeView.render(model.state.recipe);
    resultsViews.update(model.getSearchResaultPage());
    bookmarkersView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    resultsViews.renderSpinner();
    if (!query) {
      resultsViews._clear();
      return;
    }
    await model.loadSearchResults(query);

    resultsViews.render(model.getSearchResaultPage());
    ///render  initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlPagination = function (goToPage) {
  resultsViews.render(model.getSearchResaultPage(goToPage));
  paginationView.render(model.state.search);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  bookmarkersView.render(model.state.bookmarks);
  recipeView.update(model.state.recipe);
};

const controlAddRecipe = async function (somedata) {
  try {
    await model.uploadRecipe(somedata);
    console.log(model.state.recipe);
    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();
    bookmarkersView.render(model.state.bookmarks);

    // change ID in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView.toogleWindiw();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.adddHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  addRecipeView._addHandlerUpload(controlAddRecipe);
  recipeView.addHandleAddBookmark(controlAddBookmark);
  console.log('welcom');
};
init();
