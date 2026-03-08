---
agent: 'agent'
description: 'Refactor Angular components and services with modern best practices while strictly following the given guidelines'
---

## Objective

Refactor the provided Angular components and services to improve structure, readability, maintainability, and architectural quality while preserving behavior and project conventions.

## Project Context

- Angular 21
- Tailwind CSS 4
- DaisyUI 5
- Vitest for unit testing
- Standalone components by default
- Each screen is wrapped by the `app-shell` component, which defines the global layout structure

You must understand how `app-shell` controls layout before modifying any screen-level component. The `app-shell` component will be provided only when dealing with screen-level components.

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

## Output Format

- Preserve functionality.
- Do not change public APIs unless clearly incorrect.
- Do not add comments explaining obvious code.
- Do not add explanations.
- Do not introduce unnecessary abstractions or overengineering.
- Return only the improved component code.