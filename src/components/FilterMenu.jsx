export default function FilterMenu({selected, options, onChange}) {
  return (
    <div className='filter'>
      {Object.keys(options).map(o => (
        <FilterSection category={o} values={selected[o]} options={options[o]} onChange={onChange} key={o} />
      ))}
    </div>
  );
};

function FilterSection({values, options, category, onChange}) {
  function handleChange(value) {
    onChange(category, value);
  };

  return (
    <ul>
      {[...options].map(c => (
        <li key={c} onClick={() => {handleChange(c)}}>
          <input type='checkbox' value={c} checked={values.has(c)} readOnly />
          <label>{c}</label>
        </li>
      ))}
    </ul>
  );
}