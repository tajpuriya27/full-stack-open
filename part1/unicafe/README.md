# Full Stack Open

# Part 1: Introduction to React

Part 1 of the course contains exercise 1.1-1.14 and is divided into 3 category: Courseinfo, unicafe and anecdotes.
Here, we are dealing with second category of Part1 i.e. **Unicafe**  
[Quick link](https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps#exercises-1-6-1-14) to exercise

## 1.6: Unicafe, step1

<details><summary><u><b>TO DO</b></u></summary>

- Setup the files and folders as instructed.
- Initialize App.js file as:

  ```js
  import { useState } from "react";

  const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return <div>code here</div>;
  };

  export default App;
  ```

- Initialize index.js file as:

  ```js
  import React from "react";

  import ReactDOM from "react-dom/client";

  import App from "./App";

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
  ```

</details>

**<u>My Work summary</u>**

- Create `unicafe` react app with command `npx create-react-app unicafe`
- Delete extra files: (App.css, App.test.js, index.css, logo.svg, setupTests.js, reportWebVitals.js)
- Populate index.js and App.js file as instructed.

**<u>Strengthen my understanding</u>**

> While creating app using `npx create-react-app` git is automatically initialized. Never forget to remove the auto-initialize `.git` directory and `.gitignore` file.
