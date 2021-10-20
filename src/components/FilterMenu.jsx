export default function FilterMenu({selected, options, onChange}) {
  return (
    <div className='filter'>
      <FilterSection category='cancerType' values={selected.cancerType} options={options.cancerType} onChange={onChange} />
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
        <li>
          <input type='checkbox' value={c} onChange={handleChange} checked={values.has(c)} />
          <label>{c}</label>
        </li>
      ))}
    </ul>
  );
}