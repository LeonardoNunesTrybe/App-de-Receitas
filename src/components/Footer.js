import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../style/Footer.css';

function Footer() {
  return (
    <footer
      className="footer"
      data-testid="footer"
    >
      <Link to="/drinks">
        <div className="drink-icon">
          <img
            src={ drinkIcon }
            alt="Bebida"
            data-testid="drinks-bottom-btn"
          />
        </div>
      </Link>
      <Link to="/meals">
        <div className="meal-icon">
          <img
            src={ mealIcon }
            alt="Comida"
            data-testid="meals-bottom-btn"
          />
        </div>
      </Link>
    </footer>
  );
}

export default Footer;
