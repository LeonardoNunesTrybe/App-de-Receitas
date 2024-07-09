export async function getMealRecipes() {
  const MAX_MEALS = 12;
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  // console.log(data.meals);
  return data.meals.slice(0, MAX_MEALS);
  // retorna uma lista com 12 receitas MEAL
}
export async function getDrinkRecipes() {
  const MAX_DRINKS = 12;
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  // console.log(data);
  return data.drinks.slice(0, MAX_DRINKS);
  // retorna uma lista com 12 receitas DRINK
}
export async function getMealCategories() {
  const MAX_MEAL_CATEGORIES = 5;
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const categories = data.meals.map((category) => category.strCategory);
    return categories.slice(0, MAX_MEAL_CATEGORIES);
    // retorna uma lista com 5 categorias MEAL
  } catch (error) {
    console.error('Error fetching meal categories:', error);
    return [];
  }
}
export async function getDrinkCategories() {
  const MAX_DRINKS_CATEGORIES = 5;
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const categories = data.drinks.map((category) => category.strCategory);
    return categories.slice(0, MAX_DRINKS_CATEGORIES);
    // retorna uma lista com 5 categorias DRINK
  } catch (error) {
    console.error('Error fetching drink categories:', error);
    return [];
  }
}
export async function getMealRecipesByCategory(category) {
  const MAX_MEALS_RECIPES = 12;
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    return data.meals.slice(0, MAX_MEALS_RECIPES);
    // retorna uma lista com 5 categorias MEAL
  } catch (error) {
    console.error('Error fetching meal recipes by category:', error);
    return [];
  }
}
export async function getDrinkRecipesByCategory(category) {
  const MAX_DRINKS_RECIPES = 12;
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    return data.drinks.slice(0, MAX_DRINKS_RECIPES);
  } catch (error) {
    console.error('Error fetching drink recipes by category:', error);
    return [];
  }
}
export async function getMealRecipeById(id) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals[0];
  } catch (error) {
    console.error('Error fetching meal recipe by ID:', error);
    return null;
  }
}
export async function getDrinkRecipeById(id) {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data.drinks[0];
  } catch (error) {
    console.error('Error fetching drink recipe by ID:', error);
    return null;
  }
}
//
// recipesAPI.js (ou o nome que você está usando)
const BASE_API_URL = 'https://www.themealdb.com/api/json/v1/1'; // URL da API de comidas
const BASE_DRINKS_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1'; // URL da API de bebidas

export const getMealRecipeDetails = async (recipeId) => {
  try {
    const response = await fetch(`${BASE_API_URL}/lookup.php?i=${recipeId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch meal recipe details.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDrinkRecipeDetails = async (recipeId) => {
  try {
    const response = await fetch(`${BASE_DRINKS_API_URL}/lookup.php?i=${recipeId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch drink recipe details.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
