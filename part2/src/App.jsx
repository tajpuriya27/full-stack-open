const Header = (props) => {
  // console.log("header component", props);
  const { name } = props.course;
  return <h2>{name}</h2>;
};

const Content = (props) => {
  // console.log('Content component', props);
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
  // console.log("course component", props);
  const { courses } = props;
  return courses.map((element) => {
    return (
      <div key={element.id}>
        <Header course={element} />
        <Content course={element} />
        <Total course={element} />
      </div>
    );
  });
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      <h1>Web development curriculum</h1>
      <Course courses={courses} />
    </>
  );
};

export default App;
