---
agent: 'agent'
description: 'Improve Angular components according to modern best practices and project standards'
---

## Objective

Analyze the provided Angular component(s) and improve their structure, readability, maintainability, and architectural quality while adhering strictly to the project standards defined below.

Do not introduce unnecessary abstractions or overengineering.

## Project Context

- Angular 21
- Tailwind CSS 4
- DaisyUI 5
- Vitest for unit testing
- Standalone components by default
- Each screen is wrapped by the `app-shell` component, which defines the global layout structure

You must understand how `app-shell` controls layout before modifying any screen-level component.

## Coding Guidelines

- Ensure the code follows clean code principles, including descriptive naming, clear separation of concerns, and minimal duplication.
- Optimize for readability over cleverness. Favor clarity, simplicity, and maintainability.
- Dont use shorthand if-statements. Always write the if blocks inside brackets.

## Requirements

- Do not use redundant Tailwind or DaisyUI utility classes.
- Eliminate any unnecessary CSS classes to keep the markup minimal and clean.
- Prefer semantic HTML elements over div and span unless there is no meaningful semantic alternative.
- Use Angular signals as the primary reactive state mechanism unless there is a strong reason not to.
- Design and implement components with a mobile first approach while ensuring proper behavior on larger screens.
- Adhere to modern Angular best practices, clean code principles, and up to date architectural patterns.

The app-shell component will be provided to you as context. Improve the other provided components by adhering to the requirements stated above.