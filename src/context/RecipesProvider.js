import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [searchText, setSearchText] = useState('');
  const [module, setmodule] = useState();
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [resultsRecipes, setResultsRecipes] = useState([]);

  // console.log(resultsRecipes);
  const context = useMemo(() => (
    {
      searchText,
      setSearchText,
      module,
      setmodule,
      recipes,
      setRecipes,
      allRecipes,
      setAllRecipes,
      resultsRecipes,
      setResultsRecipes,
    }
  ), [searchText, module, recipes, resultsRecipes, allRecipes]);

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
