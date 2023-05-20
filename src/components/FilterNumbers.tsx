import { useContext } from 'react';
import FilterContext from '../context/FilterContext';

function FilterNumbers() {
  const {
    filterNumbers,
    handleFilterNumbers,
    handleButton,
    handleMultiplesFilter,
    handleRemoveOptions,
    handleRemoveAll,
    optionsList } = useContext(FilterContext);

  const handleFilter = () => {
    handleButton(true);
    handleMultiplesFilter();
    handleRemoveOptions();
  };

  return (
    <div className='flex'>
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2'>
        <select
          data-testid="column-filter"
          className='bg-slate-200 rounded-lg p-1.5 w-40'
          name="columnFilter"
          value={ filterNumbers.columnFilter }
          onChange={ handleFilterNumbers }
        >
          Coluna
          { optionsList.map((option) => (
            <option value={ option } key={ option }>
              { option}
            </option>
          )) }
        </select>

        <select
          data-testid="comparison-filter"
          className='bg-slate-200 rounded-lg p-1.5 w-40'
          name="comparisonFilter"
          value={ filterNumbers.comparisonFilter }
          onChange={ handleFilterNumbers }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </div>

      <div className='flex gap-2'>
        <input
          data-testid="value-filter"
          className='bg-slate-200 rounded-lg p-1.5 w-40'
          type="number"
          name="valueFilter"
          value={ filterNumbers.valueFilter }
          onChange={ handleFilterNumbers }
        />

        <select
          data-testid="column-sort"
          className='bg-slate-200 rounded-lg p-1.5 w-40'
          name=""
          id=""
        >
          Ordenar
          <option value="">population</option>
          <option value="">orbital_period</option>
          <option value="">diameter</option>
          <option value="">rotation_period</option>
          <option value="">surface_water</option>
        </select>
      </div>
      <div className='flex justify-center'>
        <button
          data-testid="button-filter"
          className='bg-slate-200 rounded-lg p-1.5 w-40'
          type="button"
          onClick={ handleFilter }
        >
          Filtrar

        </button>
      </div>
      </div>

      <div className='flex flex-col gap-2 w-70'>
        <div className='flex bg-slate-200 rounded-lg p-1.5 gap-1'>
          <input
            data-testid="column-sort-input-asc"
            type="radio"
            value="ASC"
          />
          <label htmlFor="ASC">Ascendente</label>
        </div>

        <div className='flex bg-slate-200 rounded-lg p-1.5 gap-1'>
          <input
            data-testid="column-sort-input-desc"
            type="radio"
            value="DESC"
          />
          <label 
            htmlFor="DESC"
          >
              Descendente
          </label>
        </div>
  
        <div className='flex justify-center'>
          <button
            data-testid="column-sort-button"
            className='bg-slate-200 rounded-lg p-1.5 w-30'
          >
            Ordenar
          </button>
        </div>

      </div>
      <div className='flex items-center'>
        <button
          data-testid="button-remove-filters"
          className='bg-slate-200 rounded-lg p-1.5 w-40'
          onClick={ handleRemoveAll }
        >
          remover filtros
        </button>
      </div>
    </div>
  );
}

export default FilterNumbers;
