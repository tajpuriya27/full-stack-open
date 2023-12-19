# FullStackOpen Exercises:

[Click here](https://fullstackopen.com/en) to view the main course.  
[Click here](https://studies.cs.helsinki.fi/stats/courses/fullstackopen) to submit the completed part.

## Certification

![img](./certificate-fullstack.png)

## Instructions while submitting exercise:

- Each part has its own directory, which contains a directory for each exercise set (like the unicafe exercises in part 1).

- The exercises are submitted one part at a time. When you have submitted the exercises for a part, you can no longer submit any missed exercises for that part.

### Naming convention I used while submitting exercise:

```
part0
part1
    courseinfo
    unicafe
    anecdotes
part2
    courseinfo
    phonebook
    countries
```

## Note Taking:

### Part0

- Learned about traditional website where all the components renders whenever single component is changed.
- AJAX (Asynchronous JavaScript and XML) is a term introduced in February 2005 on the back of advancements in browser technology to describe a new revolutionary approach that enabled the fetching of content to web pages using JavaScript included within the HTML, without the need to re-render the page.
- A single-page application (SPA) is a web application or website that interacts with the user by dynamically rewriting the current web page with new data from the web server, instead of the traditional method of loading entire new pages. This creates a faster and more seamless user experience, similar to that of a native app.

  - Initial Load: When you first open an SPA, all the necessary HTML, CSS, and JavaScript code is loaded by the browser. This usually includes the basic framework of the application, such as the header, navigation bar, and any other static elements.

  - Dynamic Updates: As you interact with the SPA, clicking on links, buttons, or other elements, the JavaScript code makes requests to the web server for new data. This data is then used to update the current page without having to reload the entire thing.

- **JS Libraries**
  - _jQuery:_
    - Developed for enhancing server-generated HTML pages with JavaScript.
    - Successful due to cross-browser compatibility.
    - Less relevant with browser improvements and modern frameworks.
  - _BackboneJS:_
    - Early popular framework, but limited popularity.
  - _AngularJS:_
    - Dominant framework, developed by Google, lost popularity due to backwards compatibility break i.e. AngularJS v2 is not backward compatible with v1.
  - _React (with Redux):_
    - Current leader for browser-side logic, used in this course.
  - _VueJS_
    - emerging as a challenger.

> The world of web development frameworks is constantly evolving.  
> Vanilla(pure) JS concept is always used while working with JS.

---

### Part 1

- Simple steps to create react-app is using `create react app` or `vite`.
- **JSX:** The layout of React components is mostly written using JSX. Although JSX looks like HTML, we are dealing with a way to write JavaScript. Under the hood, JSX returned by React components is compiled into JavaScript. The compilation is handled by [Babel](https://babeljs.io/repl/).
- **Props:** Passing data to the components.
- If you are using `eslint` in your IDE, it might pop up warning showing props-validation is required. We can disable this warning by adding key `'react/prop-types': 0` under `rules` key of `.eslintrc` file.
- **_Do not_** render object within component. Modern react handles rendering of arrays but try avoid rendering arrays too.
- **Component Helper Function** is a functioned defined within component and is called when the component is rendered and props donot need to be passed as parameter as it can directly accessed them.
- **Destructing** can be done in the parameter of components.
- **Re-rendering** in react is done only when `ReactDOM.createRoot(document.getElementById('root')).render(<App/>)` is called again. Therefore, we use react `state hook` for re-rendering.
- React component that uses react `state hook` are **Stateful Component**. They are responsible for re-rendering.
- An event-handler must be a function or function reference not a function call.

  ```js
  const ReactComponent = () => {
      const [counter, setCounter] = useState(0);
        const handleClick = () => {
            setCounter(counter++);
        }
      return (
         <!--Function reference given -->
          <button onClick= {handleClick}>
          Click to trigger event-handler
          </button>
            <!--Function  given -->
          <button onClick= {() => {setCounter(counter++)}}>
          Click to trigger event-handler
          </button>
          <!--Function call is not allowed -->
          <button onClick= {setCounter(counter++)}>
          Click to trigger event-handler
          </button>
      )
  }
  ```

- It is forbidden in React to mutate state directly, since it can result in unexpected side effects.

  ```js
  const [clicks, setClicks] = useState({ left: 0, right: 0 });
  // use this to update.
  const handleLeftClick = () => setClicks({ ...clicks, left: clicks.left + 1 });
  // Avoid  below, might work in some case.
  const handleLeftClick = () => {
    clicks.left++;
    setClicks(clicks);
  };
  ```

- Handling arrays:

  ```js
  const [allClicks, setAll] = useState([]);
  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
  };
  ```

- The state update in React happens asynchronously, i.e. not immediately but "at some point" before the component is rendered again.

- **Rules:**

  - Hooks may only be called from the inside of a function body that defines a React component.
  - Hooks must not be called from _inside of a loop, a conditional expression, or any place that is not a function defining a component_. This must be done to ensure that the hooks are always called in the same order, and if this isn't the case the application will behave erratically.
  - Donot define component within the component.

- > **Node.js** is a JavaScript runtime environment based on Google's Chrome V8 JavaScript engine and works practically anywhere - from servers to mobile phones.

---
