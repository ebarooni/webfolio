# Commit message format

```
<type>(<scope>): <subject>

<body>
```

- type: `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, or `chore`.
- Scope, from the touched paths: `frontend/**` → `frontend`, `backend/**` → `backend`, `docker-image/**` → `docker`, `deploy/**`, root `compose.yaml` or `Caddyfile` → `deploy`, `.github/**` → `ci`. Omit it when the change spans several of these or touches only other root files (README, AGENTS.md, root `pom.xml`).
- Version bump: `chore: raise version to X.Y.Z`, in its own commit.
- Subject: imperative, lowercase start, no trailing period, at most 72 characters.
- Body (optional): say what changed and why, compared with the old behavior. Wrap at 72 characters.
- No footers. Keep trailers that tooling adds (for example `Co-authored-by`); do not write them yourself.
