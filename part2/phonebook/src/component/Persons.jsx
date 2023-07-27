import personService from "../services/person";
import axios from "axios";

const Persons = (props) => {
  const { personsToShow, setPersons } = props;

  const delPerson = ({ id, name }) => {
    if (window.confirm(`Do you want to delete ${name}?`)) {
      axios.delete(`http://localhost:3001/persons/${id}`).then(() =>
        personService.getAll().then((res) => {
          setPersons(res);
        })
      );
    }
  };

  return personsToShow.map((element) => (
    <div key={element.name}>
      {element.name} {element.number}{" "}
      <button onClick={() => delPerson(element)}>Delete</button>
    </div>
  ));
};
export default Persons;
