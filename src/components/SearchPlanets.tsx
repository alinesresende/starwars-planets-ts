import React, { useContext } from 'react';
import FilterContext from '../context/FilterContext';

function SearchPlanets() {
  const { searchFilter, handleChange } = useContext(FilterContext);

  return (
    <input
      data-testid="name-filter"
      type="text"
      name="inputText"
      value={ searchFilter.inputText }
      onChange={ handleChange }
    />
  );
}

export default SearchPlanets;
