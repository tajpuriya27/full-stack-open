const Header = (props) => {
  const { name } = props.course;
  return <h1>{name}</h1>;
};

const Content = (props) => {
  const { parts } = props.course;
  // console.log(parts);
  return parts.map((element) => <Part key={element.id} part={element} />);
};

const Total = (props) => {
  const { parts } = props.course;
  let total = parts.reduce((acc, curElement) => acc + curElement.exercises, 0);
  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  );
};

const Course = (props) => {
  const { course } = props;
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return (
    <>
      <Course course={course} />
    </>
  );
};

export default App;
