# Exercise of Part0

Part0 has 6 exercises _(0.1-0.6)_. Out of which, first 3 exercise comprise of reading via Mozilla documentation and building basic foundation of web technologies.

## 0.1: HTML

This exercise is not submitted to GitHub. It instruct me to read the [HTML tutorial](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics) from Mozilla.

## 0.2: CSS

This exercise is not submitted to GitHub. It instruct me to read the [CSS tutorial](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics) from Mozilla.

## 0.3: HTML forms

This exercise is not submitted to GitHub. It instruct me to read the [Your-First-Form tutorial](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Your_first_HTML_form) from Mozilla.

## 0.4 New note diagram

**<u>UNDERSTANDING QUESTION</u>**

**Sequence diagram** depicting the situation where user visits the page: https://studies.cs.helsinki.fi/exampleapp/notes

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```

Here, I have to create a sequence diagram depicting the situation where the user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/notes by writing something into the text field and clicking the submit button.

I don't have to take an account of all rules while making [sequence diagram](https://www.geeksforgeeks.org/unified-modeling-language-uml-sequence-diagrams/). Sensible way of presenting the events is fine and comments on diagram is a plus point.

**<u>Solution:</u>**

> The sequence diagram below shows the events when user click on `save` button. Below figure doesnot includes the events user entering into the site https://studies.cs.helsinki.fi/exampleapp/notes

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    note over server: redirects to: <br/> https://studies.cs.helsinki.fi/exampleapp/notes
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```

## 0.5: Single page app diagram

Here, I have to create a diagram depicting the situation where the user goes to the single-page app version of the notes app at https://studies.cs.helsinki.fi/exampleapp/spa.

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "SPA is evolving", "date": "2023-07-13" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback(redrawNotes) function that renders the notes


```

## 0.6: New note in Single page app diagram

Here, I have to create a diagram depicting the situation where the user creates a new note using the single-page version of the app.

> The sequence diagram below shows the events when user click on `save` button. Below figure doesnot includes the events user entering into the site - https://studies.cs.helsinki.fi/exampleapp/spa

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    note right of browser: Default reload is prevented. Input value is sent to server. <br/> Input value is pushed to an array and redraw Funcation is called.
    activate server
    server-->>browser: Json Document
    deactivate server

```

---

All the above sequence diagram are made in https://mermaid.live/
