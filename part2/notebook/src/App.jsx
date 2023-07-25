import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleNameChange = (e) => setNewName(e.target.value);
  const handlePhoneChange = (e) => setNewPhone(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isDublicate = persons.filter((person) => person.name === newName);
    isDublicate.length
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(
          persons.concat({
            name: newName,
            number: newPhone,
            id: persons.length + 1,
          })
        );
    setNewName("");
    setNewPhone("");
  };

  const personsToShow = searchTerm
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input type="text" onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <h2>Add new</h2>
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
      <h2>Numbers</h2>
      {personsToShow.map((element) => (
        <div key={element.name}>
          {element.name} {element.number}
        </div>
      ))}
    </div>
  );
};

export default App;
