export default function TreatmentInput({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit('treatment');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name='pid' />
      <input name='date' type='date' />
      <input name='treatment' />
      <button type='submit'>Add Treatment</button>
    </form>
  );
}