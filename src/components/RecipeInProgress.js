import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

export default function RecipeInProgress() {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [recipe, setRecipe] = useState('');
  const [checkedI, setCheckedI] = useState([]);
  // const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const results = await fetch(
        location.pathname.includes('meals')
          ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const data = await results.json();
      setRecipe(data.meals?.[0] || data.drinks?.[0]);
      // console.log(recipe);
    };
    fetchRecipes();
  }, [id, location.pathname]);

  useEffect(() => {
    const itemsStorage = () => `checkedI_${location.pathname}`;

    const checkedIStorage = JSON.parse(localStorage.getItem(itemsStorage())) || [];
    setCheckedI(checkedIStorage);
  }, [location.pathname]);

  useEffect(() => {
    const itemsStorage = () => `checkedI_${location.pathname}`;

    localStorage.setItem(itemsStorage(), JSON.stringify(checkedI));
  }, [checkedI, location.pathname]);

  const handleCheckedI = ({ target }, ingredientsIndex) => {
    const { checked } = target;
    setCheckedI((prevCheckedI) => {
      if (checked) {
        return [...prevCheckedI, ingredientsIndex];
      }
      return prevCheckedI.filter((index) => index !== ingredientsIndex);
    });
  };

  const finishRecipe = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

    const newDoneRecipe = {
      id: recipe?.idMeal || recipe?.idDrink,
      name: recipe?.strMeal || recipe?.strDrink,
      category: recipe?.strCategory || recipe?.strAlcoholic,
      alcoholicOrNot: recipe?.strAlcoholic || '',
      doneDate: new Date().toISOString(),
      image: recipe?.strMealThumb || recipe?.strDrinkThumb,
      nationality: recipe?.strArea || '',
      tags: recipe?.strTags ? recipe?.strTags.split(',') : [],
      type: recipe?.idMeal ? 'meal' : 'drink',
    };
    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, newDoneRecipe]));
    history.push('/done-recipes');
  };

  // ingredientes.map((ingrediente) => ingrediente.checked === true )

  const renderIngredients = () => {
    const ingredients = [];
    const maxIngredients = 21;

    for (let index = 0; index <= maxIngredients; index += 1) {
      const i = recipe?.[`strIngredient${index}`];

      if (i) {
        const iTestId = `${index - 1}-ingredient-step`;
        const isChecked = checkedI.includes(index);

        const labelStyle = {
          textDecoration: isChecked ? 'line-through solid rgb(0, 0, 0)' : 'none',
        };

        const handleChangeCheckedI = (event) => {
          handleCheckedI(event, index);
        };

        ingredients.push(
          <label
            htmlFor={ index }
            key={ index }
            data-testid={ iTestId }
            style={ labelStyle }
          >
            <input
              id={ index }
              type="checkbox"
              checked={ isChecked }
              onChange={ handleChangeCheckedI }
            />
            {i}
          </label>,
        );
      }
    }
    return ingredients;
  };

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strDrinkThumb,
    strDrink,
    strAlcoholic,
  } = recipe;

  const allChecked = checkedI.length === renderIngredients().length;

  // console.log(recipe);

  return (
    <div>
      <h1 data-testid="recipe-title">{strMeal || strDrink}</h1>
      <img
        alt="recipe"
        data-testid="recipe-photo"
        src={ strMealThumb || strDrinkThumb }
      />
      <h2
        data-testid="recipe-category"
      >
        {strMeal ? strCategory : `${strCategory} : ${strAlcoholic}`}
      </h2>
      <p>Ingredientes:</p>
      {renderIngredients()}
      <p data-testid="instructions">{strInstructions}</p>
      <button
        type="button"
        disabled={ !allChecked }
        data-testid="finish-recipe-btn"
        onClick={ finishRecipe }
      >
        Finish Recipe
      </button>
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
    </div>
  );
}
