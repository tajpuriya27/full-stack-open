# Full Stack Open

Part-1 of the course contains exercise: 1.1 -1.6

## 1.1: Course information, step1

<details><summary><u><b>Warnings</b> - while doing exercise 1.1</u> :</summary>
1. Don't try to program all the components concurrently, because that will almost certainly break down the wholevapp. Proceed in small steps.

> "The only way to go fast, is to go well"
> -by Uncle Bob, a famous software developer

2. create-react-app automatically makes the project a git repository unless the application is created within an already existing repository. Most likely you do not want the project to become a repository, so run the command rm -rf .git in the root of the project.

</details>

<details><summary><u><b>TO DO</b></u></summary>

- Copy code from [fullstackopen - exe 1.1](https://fullstackopen.com/en/part1/introduction_to_react#exercises-1-1-1-2) and populate `App.js` and `index.js` file.

- Delete extra files: (App.css, App.test.js, index.css, logo.svg, setupTests.js, reportWebVitals.js)

- Refactor the code into 3 components so main App component in App.js look like this:

  ```js
  const App = () => {
  // const-definitions

  return (
      <div>
      <Header course={course} />
      <Content ... />
      <Total ... />
      </div>
  )
  }
  ```

</details>

**<u>My Work summary</u>**

- Components has been created within App.js file. No individual-external file was created for components.

**<u>Strengthen my understanding</u>**

- Components name must be **captilize** i.e. first letter must be uppercase.
- `props` in component are same as arguments in function; used to send data.
- Components - once created can be used multiple times.

## 1.2: Course information, step2

<details><summary><u><b>TO DO</b></u></summary>

- Refactor the Content component so that it only renders three Part components of which each renders the name and number of exercises of one part.

  ```js
  const Content = ... {
  return (
      <div>
      <Part .../>
      <Part .../>
      <Part .../>
      </div>
  )
  }
  ```

</details>

**<u>My Work summary</u>**

- Passed the variable to Part componenet via Content component. The variable remains in main app component where Content component was actually called.

**<u>Strengthen my understanding</u>**

- Component can call components as function can call functions.
- Variable data can be passed through component to inner component using props.

## 1.3: Course information, step3

<details><summary><u><b>TO DO</b></u></summary>

- Modify the variable definitions of the App component as follows and also refactor the application so that it still works:

  ```js
  const App = () => {
    const course = "Half Stack application development";
    const part1 = {
      name: "Fundamentals of React",
      exercises: 10,
    };
    const part2 = {
      name: "Using props to pass data",
      exercises: 7,
    };
    const part3 = {
      name: "State of a component",
      exercises: 14,
    };

    return <div>...</div>;
  };
  ```

</details>

**<u>My Work summary</u>**

- Added the objects as shown in To-Do and pass the props from main App component by accessing the values of object with dot operator.
    <table style="border: 1.5px solid white">
    <tr>
    <th style="border: 1.5px solid white">Before</th>
    <th>After</th>
    </tr>
    <tr>
    <td style="border: 1.5px solid white">

  ```js
  <Content
    part1={part1}
    exercises1={exercises1}
    part2={part2}
    exercises2={exercises2}
    part3={part3}
    exercises3={exercises3}
  />
  ```

    </td>
    <td>

  ```js
  <Content
    part1={part1.name}
    exercises1={part1.exercises}
    part2={part2.name}
    exercises2={part2.exercises}
    part3={part3.name}
    exercises3={part3.exercises}
  />
  ```

    </td>
    </tr>
    </table>

**<u>Strengthen my understanding</u>**

- While accessing values from objects; square bracket is used if the key has white space in it's name.
- Use of `var` must be avoided as much as we can can.
- `var` has function scope and `let` has block scope. [For More.](https://www.jstips.co/en/javascript/keyword-var-vs-let/)

## 1.4: Course information, step4

<details><summary><u><b>TO DO</b></u></summary>

- Place the objects into an array:

  ```js
  const App = () => {
    const course = "Half Stack application development";
    const parts = [
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
    ];

    return <div>...</div>;
  };
  ```

- Do not pass different objects as separate props from the App component to the components Content and Total. Instead, pass them directly as an array:

  ```js
  const App = () => {
    // const definitions

    return (
      <div>
        <Header course={course} />
        <Content parts={parts} />
        <Total parts={parts} />
      </div>
    );
  };
  ```

</details>

**<u>My Work summary</u>**

- Used Array.Prototype.map and Array.Prototype.ForEach methods to gain the resulted output.

**<u>Strengthen my understanding</u>**

- While using Array.prototype.map method in React required unique key to each rendered components. I used index as unique key. [For more.](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)

## 1.5 Course information, step5

<details><summary><u><b>TO DO</b></u></summary>

- Change the course and its parts into a single JavaScript object(as code shown below). Fix everything that breaks.

  ```js
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

    return <div>...</div>;
  };
  ```

</details>

**<u>My Work summary</u>**

- Change the 'course' and 'parts' into single javascript object and pass the props accordingly from app component.
- No changes are required in individual components.

**<u>Strengthen my understanding</u>**

- We have to render values of javascript objects but not directly objects. [For more](https://fullstackopen.com/en/part1/introduction_to_react#do-not-render-objects)

---

---
