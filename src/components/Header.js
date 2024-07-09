import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import RecipesContext from '../context/RecipesContext';
import './header.css';

export default function Header({ haveBar, title }) {
  const [searchBar, setSearchBar] = useState(false);

  const { setSearchText, searchText } = useContext(RecipesContext);

  const showBar = () => (searchBar === false ? setSearchBar(true) : setSearchBar(false));

  const handleSearch = ({ target }) => {
    setSearchText(target.value);
  };

  return (
    <>

      <div className="header-box">
        <p className="header-title">recipes app</p>
        <Link to="/profile">
          <img
            className="header-icon"
            src={ profileIcon }
            alt="profileIcon"
            data-testid="profile-top-btn"
          />
        </Link>
        { haveBar && (
          <label htmlFor="search">
            <input
              className="header-icon"
              type="image"
              src={ searchIcon }
              alt="searchIcon"
              data-testid="search-top-btn"
              id="search"
              onClick={ showBar }
            />
          </label>
        )}
      </div>

      {
        searchBar && (
          <div className="search-box">
            <input
              className="search-input"
              type="text"
              data-testid="search-input"
              value={ searchText }
              onChange={ handleSearch }
              placeholder="Search"
            />
            <SearchBar />
          </div>
        )
      }

      <h1
        className="page-title"
        data-testid="page-title"
      >
        { title }
      </h1>
    </>
  );
}

Header.propTypes = {
  haveBar: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};
