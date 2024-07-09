import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Recipes from './Recipes';

function Drinks() {
  return (
    <div>
      <Header haveBar title="Drinks" />
      <Recipes />
      <Footer />
    </div>

  );
}

export default Drinks;
