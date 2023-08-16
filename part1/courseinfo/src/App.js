// Creating components within App.js
const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return props.parts.map((prop, index) => (
    <Part part={prop.name} exercises={prop.exercises} key={index} />
  ));
};

const Total = (props) => {
  let totalExe = 0;
  props.parts.forEach((element) => {
    totalExe += element.exercises;
  });
  return <p>Number of exercises {totalExe}</p>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};
// All the components(above) has to be capitalize their initials

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
