import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Recipes from './Recipes';

function Meals() {
  return (
    <div>
      <Header haveBar title="Meals" />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Meals;
