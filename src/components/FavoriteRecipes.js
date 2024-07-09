import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import shareIcon from '../images/shareIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from './Header';

export default function FavoriteRecipes() {
  const [listRecipes, setListRecipes] = useState('All');
  const [filteredList, setFilteredList] = useState([]);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const favoritedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setListRecipes(favoritedRecipes);
    setFilteredList(favoritedRecipes);
  }, []);

  const handleFilters = (type) => {
    const filteredRecipes = listRecipes.filter((recipe) => recipe.type === type);
    setFilteredList(filteredRecipes);
  };

  const handleCopy = (type, id) => {
    const seconds = 1000;
    navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, seconds);
  };

  const unfavoriteClick = (index) => {
    const copy = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const fav = copy.filter((element) => element.id !== index.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(fav));
    setFilteredList(fav);
  };

  return (
    <div>
      <Header haveBar={ false } title="Favorite Recipes" />
      <section>
        <button
          onClick={ () => setFilteredList(listRecipes) }
          data-testid="filter-by-all-btn"
        >
          <img src={ searchIcon } alt="" />
          All
        </button>
        <button
          onClick={ () => handleFilters('drink') }
          data-testid="filter-by-drink-btn"
        >
          <img src={ drinkIcon } alt="" />
          Drinks
        </button>
        <button
          onClick={ () => handleFilters('meal') }
          data-testid="filter-by-meal-btn"
        >
          <img src={ mealIcon } alt="" />
          Meals
        </button>
      </section>
      <main>
        {
          filteredList.filter((food) => {
            switch (listRecipes) {
            case 'meals': return food.type === 'meal';
            case 'drinks': return food.type === 'drink';
            default: return food;
            }
          }).map((recipe, i) => (
            <div key={ i }>

              <Link to={ `${recipe.type}s/${recipe.id}` }>
                <img
                  style={ { width: 150 } }
                  src={ recipe.image }
                  alt={ recipe.id }
                  data-testid={ `${i}-horizontal-image` }
                />
                <h3 data-testid={ `${i}-horizontal-name` }>
                  { recipe.name }
                </h3>
              </Link>

              <h3 data-testid={ `${i}-horizontal-top-text` }>
                {`${recipe.nationality} - ${recipe.category}`}
                {recipe.alcoholicOrNot}
              </h3>

              <h3 data-testid={ `${i}-horizontal-done-date` }>
                {recipe.doneDate}
              </h3>

              <button
                type="button"
                onClick={ () => handleCopy(recipe.type, recipe.id) }
              >
                <img
                  data-testid={ `${i}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="Compartilhar"
                />
              </button>
              <button
                type="button"
                onClick={ () => unfavoriteClick(recipe) }
              >
                <img
                  data-testid={ `${i}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="Favorite"
                />
              </button>
            </div>
          ))
        }
      </main>
      {isCopied && <span>Link copied!</span>}
    </div>
  );
}
