import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Profile() {
  const history = useHistory();
  const recoveryEmail = JSON.parse(localStorage.getItem('user')) || 'sem usuário ativo';

  const handleClickDoneRecipes = () => {
    history.push('/done-recipes');
  };
  const handleClickFavoriteRecipes = () => {
    history.push('/favorite-recipes');
  };
  const handleClickLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    history.push('/');
  };

  return (
    <div>
      <Header haveBar={ false } title="Profile" />
      <div>
        <p
          data-testid="profile-email"
        >
          {Object.values(recoveryEmail)}
        </p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ handleClickDoneRecipes }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ handleClickFavoriteRecipes }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClickLogout }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}
