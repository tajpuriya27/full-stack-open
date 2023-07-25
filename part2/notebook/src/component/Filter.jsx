const Filter = ({ setSearchTerm }) => {
  return (
    <div>
      filter shown with
      <input type="text" onChange={(e) => setSearchTerm(e.target.value)} />
    </div>
  );
};

export default Filter;
