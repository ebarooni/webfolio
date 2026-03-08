---
agent: 'agent'
description: 'Write unit tests for Angular components, services, directives, and pipes with modern best practices while strictly following the given requirements'
---

## Objective

Write unit tests for the provided Angular components, services, directives and pipes to ensure functionality and code quality.

## Project Context

- Angular 21
- Tailwind CSS 4
- DaisyUI 5
- Vitest for unit testing
- Zoneless
- Uses tandalone components by default
- Each screen is wrapped by the `app-shell` component, which defines the global layout structure

## Requirements

- Ensure the code follows clean code principles.
- Use descriptive naming.
- Create clear separation of concerns.
- Avoid Duplication.
- Favor clarity, simplicity, and maintainability.
- Use one descrive block per file.
- Use the Angular TestBed and the beforeEach, beforeAll, afterEach and afterAll blocks for test setup.
- Use parametric testing if needed.
- Prefer using the ComponentFixture.debugElement.query(By) where possible to simulate interaction.
- Ensure all test code is fully type safe.
- Avoid unsafe access on implicitly typed values.
- When querying DOM elements through `DebugElement`, cast `nativeElement` to the correct concrete HTML element type before reading properties or calling methods.
- Use `provideRouter([...])` when configuring Angular TestBed for components depending on Router instead of manually mocking the Router service.

## Output Format

- Do not add comments explaining obvious code.
- Do not add explanations.
- Do not introduce unnecessary abstractions or overengineering.
- Return only the improved component code.
- The output must satisfy strict TypeScript and ESLint rules.