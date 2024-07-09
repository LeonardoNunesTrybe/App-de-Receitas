import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Slider from 'react-slick';
import { getMealRecipeDetails, getDrinkRecipeDetails } from '../services/RecipesAPI';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function RecipesDetails() {
  const { id } = useParams();
  const history = useHistory();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [isRecipeInProgress, setIsRecipeInProgress] = useState(false);
  //
  console.log(isLoading);
  const fetchRecipeDetails = async () => {
    try {
      if (window.location.pathname.startsWith('/meals')) {
        const mealDetails = await getMealRecipeDetails(id);
        setRecipeDetails(mealDetails.meals[0]);
        const drinkResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const drinkData = await drinkResponse.json();
        const DRINKS_MAX_INDEX = 6;
        setRecommendations(drinkData.drinks.slice(0, DRINKS_MAX_INDEX));
      } else if (window.location.pathname.startsWith('/drinks')) {
        const drinkDetails = await getDrinkRecipeDetails(id);
        setRecipeDetails(drinkDetails.drinks[0]);
        const mealResponse = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const mealData = await mealResponse.json();
        const MEALS_MAX_INDEX = 6;
        setRecommendations(mealData.meals.slice(0, MEALS_MAX_INDEX));
      }
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching recipe details:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipeDetails();

    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes) {
      const { meals, drinks } = inProgressRecipes;
      if ((meals && meals[id]) || (drinks && drinks[id])) {
        setIsRecipeInProgress(true);
      }
    }
  }, [id]);

  const formatIngredients = () => {
    const ingredients = [];
    const strI = 15;
    for (let i = 1; i <= strI; i += 1) {
      const ingredient = recipeDetails[`strIngredient${i}`];
      const measure = recipeDetails[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push({ name: ingredient, measure });
      }
    }
    return ingredients;
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    centerMode: true,
    centerPadding: '20px',
  };

  /* / const handleStartRecipe = () => {
    if (isRecipeInProgress) {
      const path = window.location.pathname;
      if (path.startsWith('/meals')) {
        history.push(`/meals/${id}/in-progress`);
      } else if (path.startsWith('/drinks')) {
        history.push(`/drinks/${id}/in-progress`);
      }
    } else {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
        meals: {},
        drinks: {},
      };

      if (window.location.pathname.startsWith('/meals')) {
        inProgressRecipes.meals = {
          ...inProgressRecipes.meals,
          [id]: formatIngredients(),
        };
      } else if (window.location.pathname.startsWith('/drinks')) {
        inProgressRecipes.drinks = {
          ...inProgressRecipes.drinks,
          [id]: formatIngredients(),
        };
      }

      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
      setIsRecipeInProgress(true);
    }
  }; / */

  const handleShareRecipe = () => {
    // Implementar lógica para compartilhar a receita
    alert('Receita compartilhada com sucesso!');
  };

  const handleFavoriteRecipe = () => {
    // Implementar lógica para favoritar a receita
    alert('Receita favoritada com sucesso!');
  };

  const NUMBER_VIDEO = -11;
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipeDetails.strMealThumb || recipeDetails.strDrinkThumb }
        alt={ recipeDetails.strMeal || recipeDetails.strDrink }
      />
      <h2 data-testid="recipe-title">
        {recipeDetails.strMeal || recipeDetails.strDrink}
      </h2>
      <p data-testid="recipe-category">
        {recipeDetails.strCategory}
        {recipeDetails.strAlcoholic && ` - ${recipeDetails.strAlcoholic}`}
      </p>
      <h3>Ingredients:</h3>
      <ul>
        {recipeDetails.ingredients ? (
          recipeDetails.ingredients.map((ingredient, index) => (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {`${ingredient.name} - ${ingredient.measure}`}
            </li>
          ))
        ) : (
          formatIngredients().map((ingredient, index) => (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {`${ingredient.name} - ${ingredient.measure}`}
            </li>
          ))
        )}
      </ul>
      <p data-testid="instructions">{recipeDetails.strInstructions}</p>
      {window.location.pathname.startsWith('/meals') && recipeDetails.strYoutube && (
        <div data-testid="video">
          <h3>Video:</h3>
          <iframe
            width="560"
            height="315"
            src={ `https://www.youtube.com/embed/${recipeDetails.strYoutube.slice(NUMBER_VIDEO)}` }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer;
             autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
      <h3>Recommendations:</h3>
      <Slider { ...settings }>
        {recommendations.map((recommendation, index) => (
          <div key={ index } data-testid={ `${index}-recommendation-card` }>
            <h3 data-testid={ `${index}-recommendation-title` }>
              {recommendation.strMeal || recommendation.strDrink}
            </h3>
            <img
              src={ recommendation.strMealThumb || recommendation.strDrinkThumb }
              alt={ recommendation.strMeal || recommendation.strDrink }
            />
          </div>
        ))}
      </Slider>
      <div>
        <button
          data-testid="start-recipe-btn"
          style={ {
            position: 'fixed',
            bottom: '0px',
            left: '50%',
            transform: 'translateX(-51%)',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
            cursor: 'pointer',
          } }
          // onClick={ handleStartRecipe }
          onClick={ () => (recipeDetails.strMeal
            ? history.push(`/meals/${id}/in-progress`)
            : history.push(`/drinks/${id}/in-progress`)) }
        >
          {isRecipeInProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
        <button
          data-testid="share-btn"
          onClick={ handleShareRecipe }
          style={ {
            position: 'fixed',
            bottom: '0px',
            left: '20%',
            transform: 'translateX(-50%)',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
          } }
        >
          Compartilhar
        </button>
        <button
          data-testid="favorite-btn"
          onClick={ handleFavoriteRecipe }
          style={ {
            position: 'fixed',
            bottom: '0px',
            left: '80%',
            transform: 'translateX(-50%)',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
          } }
        >
          Favoritar
        </button>
      </div>
    </div>
  );
}

export default RecipesDetails;
