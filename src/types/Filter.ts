export type FilterOption = string | number;
export type FilterOptions = FilterOption[];
export type FilterSelected = Set<FilterOption>;
export type FilterChange = (category: FilterOption, value: FilterOption) => void;