import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, KEY } from './config.js';
import { AJAX, deleteSpaces } from './helper.js';

export const state = {
  recipe: {},
  search: { query: '', results: [], resaultsPerPage: RES_PER_PAGE, page: 1 },
  bookmarks: [],
};
const createRecipeObject = function (data) {
  const { recipe } = data.data;

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);
    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    state.search.query = query;
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResaultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resaultsPerPage; ///
  const end = page * state.search.resaultsPerPage; ///9 slice doesnt return last element
  return state.search.results.slice(start, end);
};

export const updateServings = function (newservings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newservings) / state.recipe.servings;
  });
  state.recipe.servings = newservings;
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
    persistBookmarks();
  }
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
    persistBookmarks();
  }
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

const inity = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
inity();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

export const uploadRecipe = async function (newRecipe) {
  const ingredients = Object.entries(newRecipe)
    .filter(entry => entry[0].slice(0, 6) === 'ingred' && entry[1] !== '') ///////great method startWith('ingridient' instead of slice!)
    .map(el => {
      const newArr = el[1].split(',').map(el => el.trim());
      if (newArr.length !== 3) throw new Error('Wrong ingredient format!!!');
      const [quantity, unit, description] = newArr; /////// great method to delete all spaces is replaceAll(' ','')
      return { quantity: quantity ? +quantity : null, unit, description };
    });
  console.log(ingredients);

  const recipe = {
    title: newRecipe.title,
    source_url: newRecipe.sourceUrl,
    image_url: newRecipe.image,
    publisher: newRecipe.publisher,
    cooking_time: newRecipe.cookingTime,
    servings: newRecipe.servings,
    ingredients,
  };
  const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
  console.log(data);
  state.recipe = createRecipeObject(data);
  addBookmark(state.recipe);
  console.log(state.bookmarks);
};
