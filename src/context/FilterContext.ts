import { createContext } from 'react';
import { ProviderValues } from './types';

const FilterContext = createContext<ProviderValues>();

export default FilterContext;
