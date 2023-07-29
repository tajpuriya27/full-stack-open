## Steps used:

1. Initialize `git` into root folder:

- `git init`
- Create `.gitignore` file for later use.

2. Initialize npm into root folder:  
   `npm init -y`

3. Prettier configuration:

- Install **for development only**  
   `npm install -D prettier@2.7.1`
- Create configuration file named `.prettierrc` and put `{}` inside it.

4. Eslint Configuration _(for JS only)_

- Install **for development only**  
  `npm install -D eslint@8.24.0 eslint-config-prettier@8.5.0`
- Create configuration file named `.eslintrc.json` and put below lines
  ```json
  {
    "extends": ["eslint:recommended", "prettier"],
    "plugins": [],
    "parserOptions": {
      "ecmaVersion": 2022,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "env": {
      "es6": true,
      "browser": true,
      "node": true
    }
  }
  ```

5. Vite configuration:

- Install `vite` using npm:  
  `npm install -D vite@3.1.4 @vitejs/plugin-react@2.1.0`
- Add `type` attribute in `index.html` file's script tag:
  ```html
  <script type="module" src="./App.jsx"></script>
  ```
- Create `vite` configuration file named `vite.config.js`:

  ```js
  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";

  export default defineConfig({
    plugins: [react()],
    root: "src",
  });
  ```

- Update package.json file to start vite:
  ```json
    // inside scripts
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  ```

6. React and React-dom import:

- Install react and react-dom:  
  `npm install react@18.2.0 react-dom@18.2.0`

- Update(full) index.jsx as below:

  ```js
  import React from "react";
  import { createRoot } from "react-dom/client";
  import App from "./App";

  createRoot(document.getElementById("root")).render(<App />);
  ```

7. Install eslint + React in order to give ESLint a hand to get it to recognize React and not yell about React not being used:

- `npm install -D eslint-plugin-import@2.26.0 eslint-plugin-jsx-a11y@6.6.1 eslint-plugin-react@7.31.8`

- Update(full) `.eslintrc.json` to
  ```json
  {
    "extends": [
      "eslint:recommended",
      "plugin:import/errors",
      "plugin:react/recommended",
      "plugin:jsx-a11y/recommended",
      "prettier"
    ],
    "rules": {
      "react/prop-types": 0,
      "react/react-in-jsx-scope": 0
    },
    "plugins": ["react", "import", "jsx-a11y"],
    "parserOptions": {
      "ecmaVersion": 2022,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "env": {
      "es6": true,
      "browser": true,
      "node": true
    },
    "settings": {
      "react": {
        "version": "detect"
      },
      "import/resolver": {
        "node": {
          "extensions": [".js", ".jsx"]
        }
      }
    }
  }
  ```

---

---

## Run React-App

Open terminal and change directory to root folder and execute `npm run dev`.
