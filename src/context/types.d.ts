import { ChangeEvent } from 'react'

export type SearchInput = {
  inputText: string
}

export type FilterNumbers = {
  columnFilter: string
  comparisonFilter: string
  valueFilter: number
  canFilter: boolean
}

export interface OptionsValues {
  handleRemoveOptions: () => void;
  handleRemoveFilter: (newOption: string) => void;
  handleRemoveAll: () => void;
  optionsList: string[];
}

export interface ProviderValues extends OptionsValues {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  searchFilter: SearchInput;
  handleFilterNumbers: (event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => void;
  filterNumbers: FilterNumbers;
  handleButton: (newValue: boolean) => void;
  multiplesFilter: FilterNumbers[];
  handleMultiplesFilter: () => void;
}