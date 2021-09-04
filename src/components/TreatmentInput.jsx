export default function TreatmentInput() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className='form'>
      <h3>Add Treatment</h3>
      <form onSubmit={handleSubmit}>
        <span>
          <label>Cancer Type</label>
          <select name='cancer-type'>
            <option>Prostate</option>
            <option>Brain</option>
            <option>Lung</option>
            <option>Breast</option>
          </select>
        </span>
        <span>
          <label>Date</label>
          <input name='date' type='date' />
        </span>
        <span>
          <label>Treatment Type</label>
          <input name='treatment' />
        </span>
        <span className='button'>
          <button type='submit'>Add Treatment</button>
        </span>
      </form>
    </div>
  );
}