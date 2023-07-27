import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./component/Filter";
import PersonForm from "./component/PersonForm";
import Persons from "./component/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const promise = axios.get("http://localhost:3001/persons");
    promise.then((res) => {
      setPersons(res.data);
    });
  }, []);

  const handleNameChange = (e) => setNewName(e.target.value);
  const handlePhoneChange = (e) => setNewPhone(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const personToPost = {
      name: newName,
      number: newPhone,
      id: persons.length + 1,
    };
    axios
      .post("http://localhost:3001/persons", personToPost)
      .then((res) => setPersons(persons.concat(res.data)));

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
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
