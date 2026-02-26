---
agent: 'agent'
description: 'Improve code quality of Angular project and keep up with state-of-the-art patterns'
---

## Task

Analyze the given component(s) and improve the code quality according to the given requirements below.

## Project Characteristics

- Angular version 21
- Tailwind version 4
- DaisyUI version 5
- Vitest for unit tests
- Uses standalone components by default
- Each screen is wrapped by the app-shell component that provides the general layout of the UI

## Coding Guidelines

- Use descriptive names for variable names. For example use formControl instead of fc.
- Dont use shorthand if-statements. Always write the if blocks inside brackets.

## Requirements

- Do not use redundant Tailwind or DaisyUI utility classes.
- Eliminate any unnecessary CSS classes to keep the markup minimal and clean.
- Prefer semantic HTML elements over div and span unless there is no meaningful semantic alternative.
- Use Angular signals as the primary reactive state mechanism unless there is a strong reason not to.
- Design and implement components with a mobile first approach while ensuring proper behavior on larger screens.
- Adhere to modern Angular best practices, clean code principles, and up to date architectural patterns.
- Understand the app-shell component first so that you know how the general layout looks like.

The app-shell component will be provided to you as context. Improve the other provided components by adhering to the requirements stated above.