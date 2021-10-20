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
  function handleChange(event) {
    onChange(category, event.target.value);
  };

  return (
    <ul>
      {[...options].map(c => (
        <li key={c}>
          <input type='checkbox' value={c} onChange={handleChange} checked={values.has(c)} />
          <label>{c}</label>
        </li>
      ))}
    </ul>
  );
}