# Webfolio

Webfolio is a Maven based monorepo containing:

- A Quarkus backend
- An Angular frontend with Tailwind, DaisyUI, and Vitest

The repository is structured to keep backend and frontend concerns separated while still providing one build system and a simple local development flow.

## Architecture Overview

### Monorepo

The root project is a Maven parent that:

- aggregates all modules
- centralizes dependency and plugin management
- keeps versions aligned across backend and frontend

### Modules

#### Backend

- Quarkus application
- Java 21
- runs in dev mode via `mvn quarkus:dev`

#### Frontend

- Angular application
- Tailwind CSS and DaisyUI
- Vitest for unit testing
- managed via npm and Maven plugins

## Prerequisites

- Java 21
- Maven
- Node.js LTS via `nvm`

## Configuration

This project uses two different configuration flows.

### Local development

For local development, create a `.env` file at the repository root.

Example:

```bash
TELEGRAM_API_BASE_URL=https://api.telegram.org
TELEGRAM_BOT_TOKEN=0000000000:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
TELEGRAM_CHAT_ID=00000000
TZ=Europe/Berlin
WEBFOLIO_IMAGE=ebarooni/webfolio:latest
```

You can copy the values from `.env.example` and replace the Telegram placeholders with real values.

The `.env` file is used for local development by `startup.sh`. In that flow, the script reads:

- `TELEGRAM_API_BASE_URL`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

and passes them to Quarkus as JVM system properties.

That means local development does not use Docker secrets.

### Docker Compose

Docker Compose uses the root `.env` file only for Compose level variables such as:

- `WEBFOLIO_IMAGE`
- `TZ`

The application secrets for the container do not come from `.env`.

They come from the file configured in `compose.yaml`:

```yaml
secrets:
  app_secrets:
    file: ./secrets/application-secrets.properties
```

Create that file at:

```text
./secrets/application-secrets.properties
```

Example content:

```properties
telegram.chat.id=00000000
quarkus.rest-client.telegram-api.url=https://api.telegram.org/bot0000000000:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
```

Inside the container, Compose mounts that file as:

```text
/run/secrets/app_secrets.properties
```

Quarkus is configured to read it through:

```yaml
environment:
  QUARKUS_CONFIG_LOCATIONS: file:/run/secrets/app_secrets.properties
```

Important:

- the values inside `./secrets/application-secrets.properties` must be real resolved values
- placeholders such as `${TELEGRAM_BOT_TOKEN}` inside that file are not expanded by Docker Compose
- `.env` is not a templating mechanism for secret files

## Local Development

Start the local development environment from the repository root:

```bash
./startup.sh
```

This is the canonical local development entrypoint. It reads `.env`, resolves the Telegram related values, and starts Quarkus with the required system properties.

## Manual Startup

### Backend

From the repository root:

```bash
mvn -pl backend quarkus:dev
```

If you start the backend manually, you must pass the required Telegram properties yourself or provide them through another valid Quarkus config source.

### Frontend

From the frontend module:

```bash
npm install
npm run start
```

## Docker Compose

To run the containerized application, make sure both of these files exist:

- `.env`
- `./secrets/application-secrets.properties`

Then start Compose as usual.

The responsibilities are split as follows:

- `.env` provides Compose variables
- `./secrets/application-secrets.properties` provides application secrets for Quarkus inside the container

## Build

### Full build

```bash
mvn clean install
```

### Frontend tests

From the frontend module:

```bash
npm test
```

## macOS Setup

### Install Homebrew

If Homebrew is not installed, follow the official installation instructions.

Then run:

```bash
brew update
```

### Install Java

```bash
brew install openjdk
java --version
```

### Install Maven

```bash
brew install maven
mvn -v
```

### Install nvm and Node.js

Install `nvm` according to the official instructions, then run:

```bash
nvm install
nvm use
```

Check the installed versions:

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

Keep changes focused and cohesive. Prefer small, well scoped pull requests.
