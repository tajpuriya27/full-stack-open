import { useState, useEffect } from "react";

import Filter from "./component/Filter";
import PersonForm from "./component/PersonForm";
import Persons from "./component/Persons";
import personService from "./services/person";
import notify from "./component/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then((res) => {
        setPersons(res);
      })
      .catch((err) => {
        setError(`Json-sever is not providing data: ${err.message}`);
      });
  }, []);

  const handleNameChange = (e) => setNewName(e.target.value);
  const handlePhoneChange = (e) => setNewPhone(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const personToAdd = {
      name: newName,
      number: newPhone,
    };
    const isDublicate = persons.filter((person) => person.name === newName);
    if (isDublicate.length) {
      const personToUpdate = persons.find((n) => n.name === personToAdd.name);
      if (window.confirm(`Do you want to update ${personToAdd.name}?`)) {
        personService
          .updatePerson(personToUpdate.id, personToAdd)
          .then((res) => {
            personService.getAll().then((res) => {
              setPersons(res);
            });
            setNotification(`"${res.name}" gets updated!`);
            setTimeout(() => {
              setNotification(null);
            }, 2000);
          })
          .catch((err) => {
            setError(`Update Error: ${err.message}`);
            setTimeout(() => {
              setError(null);
            }, 2000);
          });
      }
    } else {
      personService
        .addPerson(personToAdd)
        .then((res) => {
          setPersons(persons.concat(res));
          setNotification(`${res.name} Added`);
          setTimeout(() => setNotification(null), 2000);
        })
        .catch((err) => {
          setError(`Validation Error: ${err.response.data.error}`);
          setTimeout(() => setError(null), 2000);
        });
    }

    setNewName("");
    setNewPhone("");
  };

  const personsToShow = searchTerm
    ? persons.filter(
        (person) =>
          person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.number.toString().includes(searchTerm)
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setSearchTerm={setSearchTerm} />

      <notify.Notification notifyMsg={notification} />
      <notify.ErrorMessage notifyMsg={error} />
      <h3>Add new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />
      <h3>Numbers</h3>
      <Persons
        personsToShow={personsToShow}
        setPersons={setPersons}
        setNotification={setNotification}
        setError={setError}
      />
    </div>
  );
};

export default App;
