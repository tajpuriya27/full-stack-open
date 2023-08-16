const PersonForm = (props) => {
  const {
    handleSubmit,
    newName,
    handleNameChange,
    newPhone,
    handlePhoneChange,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        phone:{" "}
        <input value={newPhone} onChange={handlePhoneChange} type="number" />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
