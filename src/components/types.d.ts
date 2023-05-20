import { Planet } from '../services/types';

export type PlanetState = Omit<Planet, 'residents'>[]