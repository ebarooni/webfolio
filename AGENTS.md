# AGENTS.md

Setup, configuration, and the MCP server are described in [README.md](README.md). This file only lists what the README leaves out or gets wrong.

## Toolchain

- JDK 25. The root `pom.xml` sets `maven.compiler.release=25` and the image uses `ubi9/openjdk-25`.
- Node comes from `.nvmrc` (`nvm use`), and npm is pinned by `packageManager` in both `package.json` files. The Maven build runs `npm` and `node` from your PATH.
- The root `package.json` holds only repository tooling: Prettier and Lefthook. Run `npm install` at the root once. It also installs the pre-commit hook.
- There is no Maven wrapper. Use `mvn`.

## Commands

| What | Where | Command |
| --- | --- | --- |
| Full build (all modules) | root | `mvn clean install -Ddocker.skip=true` |
| Backend dev (needs `.env`) | root | `./startup.sh` |
| Backend tests | root | `mvn -pl backend test` |
| Frontend dev (proxies `/api` to :8080) | `frontend/ui` | `npm start` |
| Frontend tests, single run | `frontend/ui` | `npm test -- --watch=false` |
| Lint and format check, everything (CI runs this) | root | `npm run lint` |
| Fix formatting and lint, everything | root | `npm run fmt` |
| One tool only | root | `npm run lint:prettier`, `lint:frontend`, `lint:java` (same names with `fmt:`) |

## Gotchas

- `src/environments/build-info.ts` is generated and gitignored. On a fresh clone, run `node scripts/generate-build-info.js` in `frontend/ui` before `npm start`, `npm test` or the first `mvn install`. Maven runs `npm test` (test phase) before it generates that file (prepare-package).
- `docker.skip` defaults to `false`, so a plain `mvn install` builds a linux/amd64 image with buildx and needs Docker running. Buildx stays so an Apple Silicon machine does not emit a native arm64 image. Pass `-Ddocker.skip=true` unless you need the image. Local push stays off (`docker.skip.push=true`). Dispatch `.github/workflows/publish-docker-image.yml` from `main` to publish `ebarooni/webfolio` to Docker Hub.
- The backend serves the SPA. In `process-resources` it copies `frontend/ui/dist/webfolio/browser` into `META-INF/resources`, so `mvn -pl backend ...` ships whatever frontend build already exists, or none at all.
- `FallbackResource` catches every unmatched `GET` and returns `index.html`. New REST endpoints go under `/api/...`, which is also the only prefix `proxy.conf.json` forwards. `/mcp` and `/q/*` belong to Quarkus.
- Telegram config is never in `application.properties`. Dev passes it as `-D` flags (`startup.sh`), containers read the secrets file (`QUARKUS_CONFIG_LOCATIONS`), and tests use WireMock (`WireMockTelegram`). Never commit `.env` or `secrets/*.properties`.
- Lint and format are split by tool. Prettier (root `prettier.config.mjs`) formats every file type it knows in the whole repository. ESLint and Stylelint stay in `frontend/ui`, because they need its Angular setup. Java uses Spotless (google-java-format) and Checkstyle (`google_checks.xml`) from Maven. Both run at `validate` in `backend`, and any Checkstyle warning fails the build.
- The pre-commit hook (`lefthook.yml`) fixes staged files and adds the fixes to the commit. Skip it once with `LEFTHOOK=0 git commit`.
- `*IT.java` tests are skipped unless you pass `-DskipITs=false` or `-Dnative`.

## Where things live

- `backend/src/main/java/dev/barooni/`: `contactform` (REST API), `telegram` (REST client), `openapi` and `mcp` (MCP server), `fallback` (SPA routing)
- `frontend/ui/src/app/`: one folder per screen, and every screen is wrapped by `app-shell`. Screen text comes from Transloco (`*transloco="let t; prefix: '...'"`); tests import `localizationTestingModule()` from `src/testing`. All screens are translated. Each blog post has one content component per language, registered in `blog/posts/post-content.ts`; post titles and summaries are under `blog.posts` in the localization files. Route titles that start with `pageTitles.` are translation keys. Routes are in `app.routes.ts`, with the path enum in `config/route.ts`. Shared presentational components (button, arrow link, page intro, form field, status message and others) are in `shared/components`; use them before you write new markup. Shared style utilities (`section-label`, `rule-list`, `field`, `meta-label`) are in `src/styles.css`. App state is in `store/app` (NgRx ComponentStore).
- `resources/localizations/src/main/resources/i18n/`: one JSON file per language (`en.json`, `de.json`). This Maven module owns all translated text. The frontend imports the files with the `@localizations/*` alias and Transloco loads them. `mvn -pl resources/localizations test` fails when a language does not have the same keys as English. To add a language, add its file there and its code to `frontend/ui/src/app/config/languages.ts`.
- Root `compose.yaml` and `Caddyfile` are for local container runs. `deploy/{caddy,webfolio,wg-easy,bitwarden,passbolt,uptime-kuma}` holds the production files copied to `/opt/docker` on the VPS (see [docs/](docs)).
- The Angular coding and test conventions are in `.github/prompts/*.prompt.md`. Follow them and don't restate them.

## Conventions

- Branches are `<type>/<short-description>`.
- The version is the single `revision` property in the root `pom.xml`. Bump it in its own commit, `chore: raise version to X.Y.Z`.
- Every commit message ends with this trailer, after one empty line:
  `Co-authored-by: Ehsan Barooni <66495214+ebarooni@users.noreply.github.com>`
  Do not add any other `Co-authored-by` line. Cursor's commit hook adds the session owner only when no trailer is present, and that adds the wrong email.
- `.github/workflows/mirror-to-gitlab.yml` mirrors `main` to GitLab. `.github/workflows/publish-docker-image.yml` publishes the Docker Hub image when dispatched from `main`. `.github/workflows/lint.yml` runs `npm run lint` on every pull request. There is no CI build or test, so run those checks locally.
- Prose and comments: ASD-STE100 Simplified Technical English. Use plain words, short sentences, and one idea per sentence. Comments say why, not what.
- No cryptic names (`d`, `m`, `bm`). Names state meaning.
- Size: aim for 250 lines or fewer per hand-written file. Split by responsibility, not by line count: one component has one template and one stylesheet. A file that is one unit may go up to 400 lines. Over 400 lines, the unit is too big: extract a child component, service or module that has its own name and job. Never split one unit into parts that always load together, such as two stylesheets on one component. Split an oversized file when you next touch it; no mass refactors. Generated files are exempt.
