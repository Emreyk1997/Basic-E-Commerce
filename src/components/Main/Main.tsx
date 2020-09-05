import React from 'react';
import './Main.css';
import Filter from './Filter/Filter';
import Products from './Products/Products';

function Main() {
  return (
    <div className="Main-Container">
      <Filter />
      <Products />
    </div>
  );
}

export default Main;
