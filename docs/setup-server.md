# Server setup

Step by step guide to setting up a VPS on Hetzner.

## Step 1: Creating a server

Head to Hetzner and open a project. Then create a server resource with the desired specification.

### Install Docker

The following options can be used to install Docker on a Hetzner server:

- Select Docker when setting up a server from the UI
- Manual installation: [Installing Docker on Ubuntu/Debian](https://community.hetzner.com/tutorials/howto-docker-install)

## Step 2: Firewall and SSH

From the Hetzner UI, navigate to the newly created server and find the firewall rules. Allow **TCP** ports:

- 22 (SSH – this can be changed later for added security)
- 80 (HTTP – web traffic)
- 443 (HTTPS - secure web traffic)

With the server selected, open the server's terminal by going to the main dashboard. This requires logging in with the **root user**. If root password is not given, it can be reset from the **Rescue tab**.

### Create user

```bash
# replace "holu" with your name/username
adduser holu

# add the new user to the sudo group
usermod -aG sudo holu

# allow the user to run docker without sudo
usermod -aG docker holu
```

If the user is created without a password, configure passwordless sudo for the `sudo` group in `/etc/sudoers` via `visudo`:

```bash
%sudo   ALL=(ALL:ALL) NOPASSWD: ALL
```

Then switch to the newly created user:

```bash
su - holu
```

### Setup SSH

Copy the contents of `~/.ssh/id_ed25519.pub` and paste them into your server under:

```bash
mkdir -p ~/.ssh
nano ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

Test logging in:

```bash
ssh holu@<SERVER_IP>
```

If successful, disable root login and password authentication . Edit the SSH config:

```bash
sudo nano /etc/ssh/sshd_config
```

Update the following:

```bash
PermitRootLogin no
PasswordAuthentication no
```

Then restart SSH:

```bash
sudo systemctl restart ssh
```

### Setup firewall

Install UFW firewall:

```bash
sudo apt update
sudo apt install ufw -y
```

Allow SSH, HTTP and HTTPS:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

Enable firewall:

```bash
sudo ufw enable
```

Check status:

```bash
sudo ufw status
```

#### Fail2Ban

Install Fail2Ban to prevent brute-force attempts:

```bash
sudo apt install fail2ban -y
```

To prevent the config from being overwritten, create a local copy of the default config:

```bash
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
```

Open the local config. Look for `[sshd]` section and ensure it's enabled:

```bash
[sshd]
enabled = true
port    = ssh
filter  = sshd
logpath = /var/log/auth.log
maxretry = 5
```

Then restart Fail2Ban:

```bash
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

Check the status of Fail2Ban:

```bash
sudo fail2ban-client status sshd
```

At this point, a new user with sudo privileges is created. SSH key login (no passwords, root login disabled), Firewall, and Fail2Ban protect the server against brute-force attempts.

## Step 3: Domain and DNS

Point the domain to the server by creating an **A record** in the domain registrar's DNS settings:

| Type | Name | Value         | TTI  |
| ---- | ---- | ------------- | ---- |
| A    | @    | `<SERVER_IP>` | 3600 |

To also handle `www`:

| Type  | Name | Value       | TTI  |
| ----- | ---- | ----------- | ---- |
| CNAME | www  | barooni.dev | 3600 |

Verify DNS propagation:

```bash
dig +short barooni.dev
```

### Second domain (barooni.de)

`barooni.de` and `www.barooni.de` only redirect to `https://barooni.dev`. Caddy does the redirect (see `deploy/caddy/Caddyfile`). It sends a permanent `301` and keeps the path and query, so `barooni.de/de/contact?x=1` lands on `barooni.dev/de/contact?x=1`. Caddy also gets the TLS certificates for both names, so `https://barooni.de` works too.

At the `barooni.de` registrar, point both names to the same server:

| Type  | Name | Value         | TTL  |
| ----- | ---- | ------------- | ---- |
| A     | @    | `<SERVER_IP>` | 3600 |
| CNAME | www  | barooni.de    | 3600 |

Do not turn on the registrar's own forwarding or parking for this domain. It would answer instead of Caddy, and most registrar forwarding has no valid certificate for `https://`. If the domain has a CAA record, it must allow `letsencrypt.org`.

The app itself only knows `barooni.dev`. Canonical links, `hreflang`, the sitemap and social preview links all use `SITE_URL` in `frontend/ui/src/app/config/site.ts`, so search engines never see `barooni.de` as a second copy of the site. Nothing else needs a change for the second domain.

`barooni.de` also has a mailbox. The web redirect only touches HTTP and HTTPS, so mail is not affected. Keep these points in mind when you change DNS:

- Leave the mail provider's records as they are: `MX`, the SPF `TXT` record on `@` and the DKIM records (usually `TXT` or `CNAME` records under `_domainkey`).
- Use an `A` record for `@`, never a `CNAME`. A `CNAME` on `@` would hide the `MX` and `TXT` records and break mail.
- There is only one SPF record per name. Never add a second `v=spf1` record. If another service has to send mail as `barooni.de`, add it to the existing record.

Add a DMARC record so other servers can check that mail from `barooni.de` really comes from you. Start in report-only mode:

| Type | Name    | Value                                           |
| ---- | ------- | ----------------------------------------------- |
| TXT  | \_dmarc | `v=DMARC1; p=none; rua=mailto:<REPORT_ADDRESS>` |

Replace `<REPORT_ADDRESS>` with a mailbox that receives the daily reports. After a few weeks of reports that show only your own mail provider, change `p=none` to `p=quarantine`, and later to `p=reject`.

Verify the redirect:

```bash
curl -sI 'http://barooni.de/de/contact?x=1' | grep -iE '^(HTTP|location)'
curl -sI https://www.barooni.de/ | grep -iE '^(HTTP|location)'
```

**Expected result:** the first command shows `308` with `Location: https://barooni.de/de/contact?x=1` (Caddy moves plain HTTP to HTTPS first). The second shows `301` with `Location: https://barooni.dev/`.

## Step 4: Deployment

The deployment files live under `/opt/docker/`. Each service gets its own directory with an independent `compose.yaml`. A shared external Docker network (`proxy`) connects the services to the Caddy reverse proxy. Bitwarden uses its own network (`bitwarden`), shared only with Caddy. Passbolt uses its own network (`passbolt`), shared only with Caddy. Its database is on a second, internal network that Caddy cannot reach.

### Folder structure on the VPS

```
/opt/docker/
|–– caddy/
|   |–– compose.yaml
|   |–– Caddyfile
|–– webfolio/
|   |–– compose.yaml
|   |–– .env
|   |–– secrets/
|       |–– application-secrets.properties
|–– wg-easy/
|   |–– compose.yaml
```

The source files are in the repository under `deploy/`. They mirror this layout.

### Create the directory structure

```bash
sudo mkdir -p /opt/docker/{caddy,webfolio/secrets}
sudo chown -R $(whoami):docker /opt/docker
chmod 750 /opt/docker /opt/docker/caddy /opt/docker/webfolio /opt/docker/webfolio/secrets
```

### Copy the deployment files

From your local machine, copy the files to the server.

```bash
scp deploy/caddy/compose.yaml deploy/caddy/Caddyfile holu@<SERVER_IP>:/opt/docker/caddy/
scp deploy/webfolio/compose.yaml deploy/webfolio/.env.example holu@<SERVER_IP>:/opt/docker/webfolio/
scp secrets/application-secrets.example.properties holu@<SERVER_IP>:/opt/docker/webfolio/secrets/application-secrets.properties
```

### Configure

SSH into the server and edit the configuration files:

```bash
ssh holu@<SERVER_IP>
```

Edit the Caddyfile and replace `example.com` with your actual domain:

```bash
nano /opt/docker/caddy/Caddyfile
```

Create the `.env` file for webfolio:

```bash
cp /opt/docker/webfolio/.env.example /opt/docker/webfolio/.env
nano /opt/docker/webfolio/.env
```

Edit the secrets file:

```bash
nano /opt/docker/webfolio/secrets/application-secrets.properties
```

### Set file permissions

```bash
# Config files – owner read/write, group read
sudo chmod 640 /opt/docker/caddy/compose.yaml
sudo chmod 640 /opt/docker/caddy/Caddyfile
sudo chmod 640 /opt/docker/webfolio/compose.yaml

# Sensitive files – owner read/write only
sudo chmod 600 /opt/docker/webfolio/.env
sudo chmod 600 /opt/docker/webfolio/secrets/application-secrets.properties
```

The `application-secrets.properties` file won't be readable by the app container if it's running as a non-root user.

Run the following command to find out which user is the container running as:

```bash
docker inspect ebarooni/webfolio:latest | grep -i user
```

Then run the following command to change the ownership of the `application-secrets.properties` file to the user inside the container and the group of your user:

```bash
sudo chown 185:holu /opt/docker/webfolio/secrets/application-secrets.properties
sudo chmod 660 /opt/docker/webfolio/secrets/application-secrets.properties
```

### Create the Docker networks

This is a one-time setup. Most services use the shared `proxy` network to communicate with Caddy. Bitwarden gets its own network `bitwarden`, which only Caddy joins (see [setup-bitwarden.md](setup-bitwarden.md#why-a-separate-network)). Passbolt gets its own network `passbolt` in the same way. See [setup-passbolt.md](setup-passbolt.md). Caddy's `compose.yaml` lists all three networks, so all three must exist before Caddy starts, even if you do not install Bitwarden or Passbolt yet:

```bash
docker network create proxy
docker network create bitwarden
docker network create passbolt
```

**Expected result:** each command prints a long ID. `docker network ls` shows `proxy`, `bitwarden` and `passbolt`. If a network exists already, Docker prints an error that says so. That is fine.

### Start the stack

Start Caddy first, then the app:

```bash
cd /opt/docker/caddy && docker compose up -d
cd /opt/docker/webfolio && docker compose up -d
```

Caddy automatically obtains and renews TLS certificates from Let's Encrypt. The app is now live at `https://example.com`

### Check status

```bash
cd /opt/docker/caddy && docker compose ps
cd /opt/docker/webfolio && docker compose logs -f
```

### Updating a service

To deploy a new version of an existing service, pull the latest image and recreate the container:

```bash
cd /opt/docker/webfolio
docker compose pull
docker compose up -d
```

`docker compose pull` fetches the latest version of the image specified in `.env`. `docker compose up -d` detects that the image has changed and recreates only the affected container. The other services are not touched.

To remove old, unused images afterwards:

```bash
docker image prune -f
```

### Adding another website

To host an additional website on the same server:

1. Create a new directory:

```bash
sudo mkdir -p /opt/docker/another-app
sudo chown $(whoami):docker /opt/docker/another-app
chmod 750 /opt/docker/another-app
```

2. Add a `compose.yaml` in `/opt/docker/another-app`:

```yaml
services:
  another-app:
    image: your-image:latest
    container_name: another-app
    restart: unless-stopped
    expose:
      - "3000"
    networks:
      - proxy

networks:
  proxy:
    external: true
```

3. Add a block to `/opt/docker/caddy/Caddyfile`:

```
another-domain.com {
    reverse_proxy another-app:3000
}
```

4. Point `another-domain.com` DNS A record to the same server IP.

5. Reload Caddy and start the new app:

```bash
cd /opt/docker/caddy && docker compose exec caddy caddy reload --config /etc/caddy/Caddyfile
cd /opt/docker/another-app && docker compose up -d
```

Caddy will automatically provision a TLS certificate for the new domain. The existing services are not affected.
