import { useContext, useEffect, useState } from 'react';
import FilterContext from '../context/FilterContext';
import apiPlanets from '../services/apiStarWars';
import FilterNumbers from './FilterNumbers';
import SearchPlanets from './SearchPlanets';
import { PlanetState } from './types';

function Table() {
  const [planets, setPlanets] = useState<PlanetState>([]);
  const [listPlanetsFiltered, setListPlanetsFiltered] = useState<PlanetState>([]);
  const { searchFilter,
    multiplesFilter,
    handleRemoveFilter } = useContext(FilterContext);

  useEffect(() => {
    const getPlanets = async () => {
      const data = await apiPlanets();
      setPlanets(data);
      setListPlanetsFiltered(data);
    };

    getPlanets();
  }, []);

  useEffect(() => {
    const listFilterNumbers = planets.filter((planet) => {
      const shouldInclude = multiplesFilter.every((filter) => {
        const greaterThan = Number(planet[
          filter.columnFilter]) > Number(filter.valueFilter);

        const smallerThan = Number(planet[
          filter.columnFilter]) < Number(filter.valueFilter);

        const equalTo = Number(planet[
          filter.columnFilter]) === Number(filter.valueFilter);
        if (filter.comparisonFilter === 'maior que') {
          return greaterThan;
        }
        if (filter.comparisonFilter === 'menor que') {
          return smallerThan;
        }
        if (filter.comparisonFilter === 'igual a') {
          return equalTo;
        }
        return true;
      });
      return shouldInclude;
    });
    setListPlanetsFiltered(listFilterNumbers);
  }, [multiplesFilter, planets]);

  const listFilterPlanets = planets.filter((planet) => (
    planet.name.includes(searchFilter.inputText)
  ));

  const planetsChoice = multiplesFilter.map((planet) => (
    <div key={ planet.columnFilter }>
      <p data-testid="filter">
        <p>
          { planet.columnFilter }
        </p>
        <p>
          { planet.comparisonFilter}
        </p>
        <p>
          { planet.valueFilter }
        </p>
        <button
          onClick={ () => { handleRemoveFilter(planet.columnFilter); } }
        >
          delete
        </button>
      </p>
    </div>
  ));

  const filterPlanetsOrNumbers = searchFilter.inputText
    ? listFilterPlanets : listPlanetsFiltered;

  return (
    <div>
      <SearchPlanets />
      <FilterNumbers />
      <p>
        { planetsChoice }
      </p>
      <table className='border-separate border-spacing-2'>
        <thead>
          <tr>
            <th className='min-w-[40px] rounded-lg bg-slate-100'> Name </th>
            <th className='min-w-[100px] rounded-lg bg-slate-100'> Rotation Period </th>
            <th className='min-w-[100px] rounded-lg bg-slate-100'> Orbital Period </th>
            <th className='min-w-[100px] rounded-lg bg-slate-100'> Diameter </th>
            <th className='min-w-[100px] rounded-lg bg-slate-100'> Climate </th>
            <th className='min-w-[100px] rounded-lg bg-slate-100'> Gravity</th>
            <th className='min-w-[100px] rounded-lg bg-slate-100'> Terrain </th>
            <th className='min-w-[100px] rounded-lg bg-slate-100'> Surface Water </th>
            <th className='min-w-[100px] rounded-lg bg-slate-100'> Population </th>
            <th className='min-w-[70px] rounded-lg bg-slate-100'> Films </th>
            <th className='min-w-[100px] rounded-lg bg-slate-100'> Created </th>
            <th className='min-w-[100px] rounded-lg bg-slate-100'> Edited </th>
            <th className='min-w-[100px] rounded-lg bg-slate-100'> URL </th>
          </tr>
        </thead>
        <tbody>
          { filterPlanetsOrNumbers.map((planet) => (
            <tr key={ planet.name }>
              <td className='min-w-[100px] rounded-lg bg-slate-100'>
                { planet.name }
              </td>
              <td>
                { planet.rotation_period }
              </td>
              <td>
                { planet.orbital_period }
              </td>
              <td>
                { planet.diameter}
              </td>
              <td>
                { planet.climate}
              </td>
              <td>
                { planet.gravity}
              </td>
              <td>
                { planet.terrain}
              </td>
              <td>
                { planet.surface_water}
              </td>
              <td>
                { planet.population}
              </td>
              <td className='min-w-[70px]'>
                { planet.films.map((films) => films)}
              </td>
              <td>
                { planet.created}
              </td>
              <td>
                { planet.edited}
              </td>
              <td>
                { planet.url}
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
