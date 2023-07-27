import { useState, useEffect } from "react";

import Filter from "./component/Filter";
import PersonForm from "./component/PersonForm";
import Persons from "./component/Persons";
import personService from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    personService.getAll().then((res) => {
      setPersons(res);
    });
  }, []);

  const handleNameChange = (e) => setNewName(e.target.value);
  const handlePhoneChange = (e) => setNewPhone(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const personToAdd = {
      name: newName,
      number: newPhone,
      id: persons.length + 1,
    };
    const isDublicate = persons.filter((person) => person.name === newName);
    isDublicate.length
      ? alert(`${newName} is already added to phonebook`)
      : personService
          .addPerson(personToAdd)
          .then((res) => setPersons(persons.concat(res)))
          .catch((err) => {
            alert(`Intermediate ids are missing. ${err.message}`);
          });

    setNewName("");
    setNewPhone("");
  };

  const personsToShow = searchTerm
    ? persons.filter(
        (person) =>
          person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.number.includes(searchTerm)
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setSearchTerm={setSearchTerm} />

      <h3>Add new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} setPersons={setPersons} />
    </div>
  );
};

export default App;
