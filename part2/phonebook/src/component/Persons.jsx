import personService from "../services/person";

const Persons = (props) => {
  const { personsToShow, setPersons, setNotification, setError } = props;

  const delFun = ({ id, name }) => {
    if (window.confirm(`Do you want to delete ${name}?`)) {
      personService
        .delPerson(id)
        .then(() => {
          personService.getAll().then((res) => {
            setPersons(res);
          });
          setNotification(`${name} deleted!`);
          setTimeout(() => setNotification(null), 3000);
        })
        .catch((err) => {
          setError(`${name} has already deleted: ${err.message}`);
          setTimeout(() => setError(null), 3000);
        });
    }
  };

  return personsToShow.map((element) => (
    <div key={element.name}>
      {element.name} {element.number}{" "}
      <button onClick={() => delFun(element)}>Delete</button>
    </div>
  ));
};
export default Persons;
