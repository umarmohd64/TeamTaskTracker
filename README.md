# Team Task Tracker

A clean, browser-based task tracking app that allows teams to create, assign, and manage tasks — fully built with **HTML, CSS, and modular JavaScript**.

> **This project is a part of onboarding training for all new associate hires.**

---

## Features

- Add new tasks
- Assign tasks to specific team members
- Track task progress: **To Do → In Progress → Done**
- Edit or 🗑️ Delete any task
- Data persists in the browser using `localStorage`
- Built using classes, event delegation, and modular code structure
- Minimal UI with color-coded task statuses and custom dropdown

---

## Technologies Used

| Language     | Purpose                     |
|--------------|------------------------------|
| **HTML5**    | Markup and layout             |
| **CSS3**     | Styling and UI design         |
| **JavaScript (ES6+)** | Logic, interactivity, storage |

---

## Project Structure


📦 Team Task Tracker
├── index.html          # Main HTML structure
├── style.css           # CSS for styling
│
├── constants.js        # Shared enums and keys
├── dom.js              # DOM element selectors
├── storage.js          # Handles saving/loading from localStorage
├── taskService.js      # Business logic for tasks
├── ui.js               # UI rendering and event handling
├── main.js             # App initializer and wiring
