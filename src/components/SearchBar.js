import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import './searchbar.css';

function SearchBar() {
  const { searchText, setRecipes,
    module, setmodule, setResultsRecipes } = useContext(RecipesContext);

  const firstLetter = 'first-letter';
  const location = useLocation();
  const { pathname } = location;
  const history = useHistory();

  const searchAPIMeals = async () => {
    if (searchText.length > 1 && module === firstLetter) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      switch (module) {
      case 'ingredients':
        await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`)
          .then((response) => response.json())
          .then((data) => {
            setRecipes(data.meals);
            const MAX_MEALS = 12;
            setResultsRecipes(data.meals.slice(0, MAX_MEALS));
          });
        break;
      case 'name':
        await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.meals === null) {
              global.alert('Sorry, we haven\'t found any recipes for these filters.');
            } else {
              setResultsRecipes(data.meals);
              if (data.meals.length === 1) {
                history.push(`/meals/${data.meals[0].idMeal}`);
              }
            }
          });
        break;
      case firstLetter:
        await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText}`)
          .then((response) => response.json())
          .then((data) => {
            const MAX_MEALS = 12;
            setResultsRecipes(data.meals.slice(0, MAX_MEALS));
          });
        break;
      default:
        break;
      }
    }
  };

  const searchAPIDrinks = async () => {
    if (searchText.length > 1 && module === 'first-letter') {
      global.alert('Your search must have only 1 (one) character');
    } else {
      console.log(searchText, module);
      switch (module) {
      case 'ingredients':
        await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchText}`)
          .then((response) => response.json())
          .then((data) => {
            setRecipes(data.drinks);
            const MAX_MEALS = 12;
            setResultsRecipes(data.drinks.slice(0, MAX_MEALS));
          });
        break;
      case 'name':
        await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.drinks === null) {
              global.alert('Sorry, we haven\'t found any recipes for these filters.');
            } else {
              setResultsRecipes(data.drinks);
              if (data.drinks.length === 1) {
                history.push(`/drinks/${data.drinks[0].idDrink}`);
              }
              const MAX_MEALS = 12;
              setResultsRecipes(data.drinks.slice(0, MAX_MEALS));
            }
          });
        break;
      case firstLetter:
        await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchText}`)
          .then((response) => response.json())
          .then((data) => {
            setRecipes(data.drinks);
            const MAX_MEALS = 12;
            setResultsRecipes(data.drinks.slice(0, MAX_MEALS));
          });
        break;
      default:
        break;
      }
    }
  };
  // Beef Lo Mein
  const handleClick = () => {
    switch (pathname) {
    case '/meals':
      searchAPIMeals();
      break;
      // Aquamarine
    default:
      searchAPIDrinks();
      break;
    // default:
    //   break;
    }
  };

  return (
    <div className="searchbar-box">
      <div className="searchbar-modules">
        <input
          type="radio"
          name="search-radio"
          id="ingredients"
          value="ingredients"
          checked={ module === 'ingredients' }
          onChange={ ({ target }) => setmodule(target.value) }
          data-testid="ingredient-search-radio"
        />
        <label htmlFor="ingredients">Ingredients</label>
        <input
          type="radio"
          name="search-radio"
          id="name"
          value="name"
          checked={ module === 'name' }
          onChange={ ({ target }) => setmodule(target.value) }
          data-testid="name-search-radio"
        />
        <label htmlFor="name">Name</label>
        <input
          type="radio"
          name="search-radio"
          id="first-letter"
          value="first-letter"
          checked={ module === firstLetter }
          onChange={ ({ target }) => setmodule(target.value) }
          data-testid="first-letter-search-radio"
        />
        <label htmlFor="first-letter">First letter</label>
      </div>

      <button
        className="searchbar-btn"
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        SEARCH
      </button>

    </div>
  );
}

export default SearchBar;
