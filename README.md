# Webfolio

Webfolio is a Maven-based monorepo containing:

- A **Quarkus** backend (Java)
- An **Angular** frontend (Angular 21, Tailwind, DaisyUI, Vitest)

The repository is structured to provide a clean separation of concerns while keeping the developer experience simple: one repository, one build system, one entrypoint for local development.

## Architecture Overview

### Monorepo (Maven parent project)

The root project is a Maven parent (`pom.xml`) that:

- Aggregates all modules
- Centralizes dependency and plugin management
- Keeps versions aligned across backend and frontend

### Modules

- **Backend**
  - Quarkus application
  - Java 21
  - Runs in dev mode via `mvn quarkus:dev`

- **Frontend**
  - Angular application
  - Tailwind CSS + DaisyUI
  - Vitest for unit testing
  - Managed via npm (orchestrated by Maven plugins)

## Prerequisites

- Java 21
- Maven
- Node.js (LTS) via `nvm`

macOS setup is described below.

## Environment Configuration

At the root of the repository, create a `.env` file:

```bash
TELEGRAM_BOT_TOKEN=your_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

These variables are required for Telegram integration.

The `.env` file must not be committed. If needed, provide an `.env.example` instead.

## Local Development

### Recommended: Start Everything

```bash
./startup.sh
```

This script is the canonical way to start the development environment. It ensures:

- Frontend dependencies are installed
- Angular dev server is started
- Quarkus runs in dev mode
- Both modules are wired correctly

Use this instead of starting modules manually unless you have a specific reason.

## Manual Startup (Optional)

### Backend (Quarkus)

From the backend module:

```bash
mvn quarkus:dev
```

### Frontend (Angular)

From the frontend module:

```bash
npm install
npm run start
```

## Build

### Full Build (All Modules)

```bash
mvn clean install
```

### Frontend Tests

From the frontend module:

```bash
npm test
```

## macOS Setup (Recommended)

### 1. Install Homebrew

If Homebrew is not installed, follow the official installation instructions.

After installation:

```bash
brew update
```

### 2. Install Java

```bash
brew install openjdk
java --version
```

### 3. Install Maven

```bash
brew install maven
mvn -v
```

### 4. Install nvm and Node (LTS)

Install nvm according to the official instructions, then run:

```bash
nvm install
nvm use
```

Check the respective versions by running:

```bash
node -v
npm -v
```

## Development Workflow

Create a feature branch:

```bash
git checkout -b feat/<short-description>
```

Start the development environment:

```bash
./startup.sh
```

Keep changes focused and cohesive. Prefer small, well-scoped pull requests.
