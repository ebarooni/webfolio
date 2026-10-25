# AGENTS.md

Setup, configuration, and the MCP server are described in [README.md](README.md). This file only lists what the README leaves out or gets wrong.

## Toolchain

- JDK 25. The root `pom.xml` sets `maven.compiler.release=25` and the image uses `ubi9/openjdk-25`.
- Node comes from `.nvmrc` (`nvm use`), and npm is pinned by `packageManager` in `frontend/ui/package.json`. The Maven build runs `npm` and `node` from your PATH.
- There is no Maven wrapper. Use `mvn`.

## Commands

| What | Where | Command |
| --- | --- | --- |
| Full build (all modules) | root | `mvn clean install -Ddocker.skip=true` |
| Backend dev (needs `.env`) | root | `./startup.sh` |
| Backend tests | root | `mvn -pl backend test` |
| Frontend dev (proxies `/api` to :8080) | `frontend/ui` | `npm start` |
| Frontend tests, single run | `frontend/ui` | `npm test -- --watch=false` |
| Lint the way the build does | `frontend/ui` | `npm run lint` |
| Full lint (prettier, stylelint, eslint) | `frontend/ui` | `npm run lint:all`, fix with `npm run fmt:all` |

## Gotchas

- `src/environments/build-info.ts` is generated and gitignored. On a fresh clone, run `node scripts/generate-build-info.js` in `frontend/ui` before `npm start`, `npm test` or the first `mvn install`. Maven runs `npm test` (test phase) before it generates that file (prepare-package).
- `docker.skip` defaults to `false`, so a plain `mvn install` builds a linux/amd64 image with buildx and needs Docker running. Buildx stays so an Apple Silicon machine does not emit a native arm64 image. Pass `-Ddocker.skip=true` unless you need the image. Local push stays off (`docker.skip.push=true`). Dispatch `.github/workflows/publish-docker-image.yml` from `main` to publish `ebarooni/webfolio` to Docker Hub.
- The backend serves the SPA. In `process-resources` it copies `frontend/ui/dist/webfolio/browser` into `META-INF/resources`, so `mvn -pl backend ...` ships whatever frontend build already exists, or none at all.
- `FallbackResource` catches every unmatched `GET` and returns `index.html`. New REST endpoints go under `/api/...`, which is also the only prefix `proxy.conf.json` forwards. `/mcp` and `/q/*` belong to Quarkus.
- Telegram config is never in `application.properties`. Dev passes it as `-D` flags (`startup.sh`), containers read the secrets file (`QUARKUS_CONFIG_LOCATIONS`), and tests use WireMock (`WireMockTelegram`). Never commit `.env` or `secrets/*.properties`.
- Checkstyle (`google_checks.xml`, 2-space indent) runs at `validate` in `backend`. `*IT.java` tests are skipped unless you pass `-DskipITs=false` or `-Dnative`.

## Where things live

- `backend/src/main/java/dev/barooni/`: `contactform` (REST API), `telegram` (REST client), `openapi` and `mcp` (MCP server), `fallback` (SPA routing)
- `frontend/ui/src/app/`: one folder per screen, and every screen is wrapped by `app-shell`. Routes are in `app.routes.ts`, with the path enum in `config/route.ts`. App state is in `store/app` (NgRx ComponentStore).
- Root `compose.yaml` and `Caddyfile` are for local container runs. `deploy/{caddy,webfolio,wg-easy}` holds the production files copied to `/opt/docker` on the VPS (see [docs/](docs)).
- The Angular coding and test conventions are in `.github/prompts/*.prompt.md`. Follow them and don't restate them.

## Conventions

- Branches are `<type>/<short-description>`.
- The version is the single `revision` property in the root `pom.xml`. Bump it in its own commit, `chore: raise version to X.Y.Z`.
- `.github/workflows/mirror-to-gitlab.yml` mirrors `main` to GitLab. `.github/workflows/publish-docker-image.yml` publishes the Docker Hub image when dispatched from `main`. There is no CI build or test, so run the checks above locally.
- Prose and comments: ASD-STE100 Simplified Technical English. Use plain words, short sentences, and one idea per sentence. Comments say why, not what.
- No cryptic names (`d`, `m`, `bm`). Names state meaning.
- Soft cap: hand-authored files stay at or under 250 lines unless you state a reason. Split an oversized file when you next touch it; no mass refactors. Generated files are exempt.
