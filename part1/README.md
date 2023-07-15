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
