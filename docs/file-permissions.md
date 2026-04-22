# File permissions

Ownership and permission reference for the deployment files on the VPS.

All files and directories under `/opt/docker` are owned by the non-root user (`holu`) and the `docker` group. This allows running `docker compose` without `sudo` while keeping the files inaccessible to the other users on the system.

## Ownership

Every file and directory in Linux has two ownership attributes:

- **Owner** – a single user (e.g. `holu`)
- **Group** – a group of users (e.g. `docker`)

These two are independent. When a file is owned by `holu:docker`, it means:

- `holu` is the **owner** of the file
- `docker` is the **group** assigned to the file

It does **not** mean that `holu` is part of the `docker` group (although he is – that was done separately with `usermod -aG docker holu` in the server setup). It simply means the file's group label is set to `docker`.

### Why this matters

Permissions are evaluated in order: **owner -> group -> others**. For a file with mode `640`:

```
6   ->  owner (holu)        -> read + write
4   -> group (docker)       -> read only
0   -> everyone else        -> no access
```

So if another user on the system is in the `docker` group, they could read the file. If they are not in the `docker` group, they get no access at all.

### Example

After creating `/opt/docker/`, it is initially owned by `root:root`:

```
drwxr-xr-x root root /opt/docker
```

Running the following command:

```bash
sudo chown -R $(whoami):docker /opt/docker
```

Changes it to:

```
drwxr-xr-x holu docker /opt/docker
```

Breaking down the command:

| Part          | Meaning                                                       |
|---------------|---------------------------------------------------------------|
| `sudo`        | Run as root – required because the directory is owned by root |
| `chown`       | Change ownership                                              |
| `-R`          | Recursive – apply to the directory and everything inside it   |
| `$(whoami)`   | Evaluates to the current username (e.g. `holu`)               |
| `:docker`     | Set the group to `docker`                                     |
| `/opt/docker` | The target path                                               |

After this, `holu` can read, write and manage everything under `/opt/docker/` without `sudo`.

## Directory permissions

Directories use `750` – owner has full access, the `docker` group can read and traverse, all other users are blocked.

| Path                           | Mode  | Owner  | Group    |
|--------------------------------|-------|--------|----------|
| `/opt/docker/`                 | `750` | `holu` | `docker` |
| `/opt/docker/caddy`            | `750` | `holu` | `docker` |
| `/opt/docker/webfolio`         | `750` | `holu` | `docker` |
| `/opt/docker/webfolio/secrets` | `750` | `holu` | `docker` |
| `/opt/docker/wg-easy`          | `750` | `holu` | `docker` |

## File permissions

Files are split into two categories based on sensitivity:

### Configuration files – `640`

Owner can read and write, the `docker` group can read. These files do not contain credentials.

| File                                | Mode  | Contents                    |
|-------------------------------------|-------|-----------------------------|
| `/opt/docker/caddy/compose.yaml`    | `640` | Caddy service definitions   |
| `/opt/docker/caddy/Caddyfile`       | `640` | Domain routing rules        |
| `/opt/docker/webfolio/compose.yaml` | `640` | Webfolio service definition |
| `/opt/docker/wg-easy/compose.yaml`  | `640` | wg-easy service definition  |

### Sensitive files – `600`

Owner can read and write. No access for group or others. These files contain secrets or credentials.

| File                                                          | Mode  | Contents                         |
|---------------------------------------------------------------|-------|----------------------------------|
| `/opt/docker/webfolio/.env`                                   | `600` | Docker image tag, timezone       |
| `/opt/docker/webfolio/secrets/application-secrets.properties` | `600` | Telegram API token and chat ID   |
| `/opt/docker/wg-easy/.env`                                    | `600` | WireGuard host and password hash |

## Apply permissions

```bash
# Directories
chmod 750 /opt/docker \
          /opt/docker/caddy \
          /opt/docker/webfolio \
          /opt/docker/webfolio/secrets

# Configuration files
chmod 640 /opt/docker/caddy/compose.yaml \
          /opt/docker/caddy/Caddyfile \
          /opt/docker/webfolio/compose.yaml \
          /opt/docker/wg-easy/compose.yaml

# Sensitive files
chmod 600 /opt/docker/webfolio/.env \
          /opt/docker/webfolio/secrets/application-secrets.properties \
          /opt/docker/wg-easy/.env
```

## Verify

```bash
find /opt/docker -exec ls -ld {} +
```

Expected output:

```
drwxr-x--- holu docker  /opt/docker
drwxr-x--- holu docker  /opt/docker/caddy
-rw-r----- holu docker  /opt/docker/caddy/compose.yaml
-rw-r----- holu docker  /opt/docker/caddy/Caddyfile
drwxr-x--- holu docker  /opt/docker/webfolio
-rw-r----- holu docker  /opt/docker/webfolio/compose.yaml
-rw------- holu docker  /opt/docker/webfolio/.env
drwxr-x--- holu docker  /opt/docker/webfolio/secrets
-rw------- holu docker  /opt/docker/webfolio/secrets/application-secrets.properties
drwxr-x--- holu docker  /opt/docker/wg-easy
-rw-r----- holu docker  /opt/docker/wg-easy/compose.yaml
-rw------- holu docker  /opt/docker/wg-easy/.env
```

## Adding a new service

When adding a new service directory, apply the same pattern:

```bash
sudo mkdir -p /opt/docker/new-service
sudo chown $(whoami):docker /opt/docker/new-service
chmod 750 /opt/docker/new-service
chmod 640 /opt/docker/new-service/compose.yaml
chmod 600 /opt/docker/new-service/.env  # if applicable
```
