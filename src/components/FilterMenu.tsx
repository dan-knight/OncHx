import { FilterChange, FilterOption, FilterOptions, FilterSelected } from "../types/Filter";

interface FilterMenuProps {
  filters: { [key: string]: FilterOptions },
  selected: { [key: string]: FilterSelected }
  onChange: FilterChange
}

export default function FilterMenu(props: FilterMenuProps) {
  return (
    <div className='filter'>
      {Object.keys(props.filters).map(o => (
        <FilterSection category={o} selected={props.selected[o]} options={props.filters[o]} 
          onChange={props.onChange} key={o} />
      ))}
    </div>
  );
};

interface FilterSectionProps {
  options: FilterOptions,
  selected: FilterSelected,
  category: string,
  onChange: FilterChange
}

function FilterSection(props: FilterSectionProps) {
  function handleChange(value: FilterOption) {
    props.onChange(props.category, value);
  };

  return (
    <ul>
      {[...props.options].map(c => (
        <li key={c} onClick={() => {handleChange(c)}}>
          <input type='checkbox' value={c} checked={props.selected.has(c)} readOnly />
          <label>{c}</label>
        </li>
      ))}
    </ul>
  );
}