import { useState } from "react";

export default function FilterMenu() {
  const [selected, setSelected] = useState(new Set());

  function handleCheck(e) {
    const value = e.target.value;
    const newSelected = new Set(selected);

    if (newSelected.has(value)) {
      newSelected.delete(value);
    } else {
      newSelected.add(value);
    }

    setSelected(newSelected);
  }

  return (
    <ul className='filter'>
      {['Prostate', 'Thyroid'].map(c => (
        <li>
          <input type='checkbox' value={c} onChange={handleCheck} checked={selected.has(c)} />
          <label>{c}</label>
        </li>
      ))}
    </ul>
  );
};