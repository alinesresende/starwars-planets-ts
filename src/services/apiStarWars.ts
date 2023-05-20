import { StarWars } from './types';

const apiPlanets = async () => {
  const response = await fetch('https://swapi.dev/api/planets');
  const data: StarWars = await response.json();
  const apiData = data.results;
  const newData = apiData.map((info) => {
    const { residents, ...rest } = info;
    return rest;
  });
  return newData;
};

export default apiPlanets;
