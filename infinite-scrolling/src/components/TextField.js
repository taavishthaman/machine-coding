function TextField({ setQuery }) {
  function changeHandler(e) {
    setQuery(e.target.value);
  }

  return (
    <div>
      <input type="text" onChange={(e) => changeHandler(e)} />
    </div>
  );
}

export default TextField;
