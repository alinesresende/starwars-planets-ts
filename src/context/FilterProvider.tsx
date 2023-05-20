import React, { ChangeEvent, useMemo, useState } from 'react';
import FilterContext from './FilterContext';
import { FilterNumbers, SearchInput } from './types';

function FilterProvider({ children }) {
  const [searchFilter, setSearchFilter] = useState<SearchInput>({
    inputText: '',
  });

  const [filterNumbers, setFilterNumbers] = useState<FilterNumbers>({
    columnFilter: 'population',
    comparisonFilter: 'maior que',
    valueFilter: 0,
    canFilter: false,
  });

  const [multiplesFilter, setMulitplesFilter] = useState<FilterNumbers[]>([]);

  const [optionsList, setOptionsList] = useState<string[]>(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );

  const optionsValue = useMemo(() => {
    const handleRemoveOptions = () => {
      const filteredOptionsList = optionsList.filter((option) => (
        option !== filterNumbers.columnFilter
      ));
      setOptionsList(
        filteredOptionsList,
      );
      setFilterNumbers({
        ...filterNumbers,
        columnFilter: filteredOptionsList[0],
        comparisonFilter: 'maior que',
        valueFilter: 0,
        canFilter: true,
      });
    };
    const handleRemoveFilter = (newOption: string) => {
      setOptionsList([
        ...optionsList,
        newOption,
      ]);
      setMulitplesFilter(
        multiplesFilter.filter((removeOption) => (
          removeOption.columnFilter !== newOption
        )),
      );
    };
    const handleRemoveAll = () => {
      setMulitplesFilter([]);
    };
    return {
      handleRemoveOptions,
      handleRemoveFilter,
      handleRemoveAll,
      optionsList,
    };
  }, [optionsList, filterNumbers, multiplesFilter]);

  const values = useMemo(() => {
    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = target;
      setSearchFilter({
        ...searchFilter,
        [name]: value,
      });
    };
    const handleFilterNumbers = ({ target }) => {
      const { name, value } = target;
      setFilterNumbers({
        ...filterNumbers,
        [name]: value,
        canFilter: false,
      });
    };
    const handleButton = (newValue: boolean) => {
      setFilterNumbers({
        ...filterNumbers,
        canFilter: newValue,
      });
    };
    const handleMultiplesFilter = () => {
      setMulitplesFilter([
        ...multiplesFilter,
        filterNumbers,
      ]);
    };
    return {
      handleChange,
      searchFilter,
      handleFilterNumbers,
      filterNumbers,
      handleButton,
      multiplesFilter,
      handleMultiplesFilter };
  }, [searchFilter, filterNumbers, multiplesFilter]);

  return (
    <FilterContext.Provider value={ { ...values, ...optionsValue } }>
      { children }
    </FilterContext.Provider>
  );
}

export default FilterProvider;
