import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleChange = (e) => setNewName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isDublicate = persons.filter((person) => person.name === newName);
    isDublicate.length
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat({ name: newName }));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((element) => (
        <div key={element.name}>{element.name}</div>
      ))}
    </div>
  );
};

export default App;
