# WireGuard VPN (wg-easy)

WireGuard VPN running via [wg-easy](https://github.com/wg-easy/wg-easy) on the VPS. The admin web UI is **not** exposed to the internet – it is only accessible through an SSH tunnel.

## Overview

- **WireGuard UDP port (51820)** – open to the internet (required for VPN clients to connect)
- **Web UI (51821)** – bound to `127.0.0.1` on the server, only reachable via SSH tunnel

## Setup

### 1. Open the WireGuard UDP port

On the VPS:

```bash
sudo ufw allow 51820/udp
```

Also add a **UDP 51820** rule in the Hetzner firewall UI.

### 2. Create the directory on the VPS

```bash
sudo mkdir -p /opt/docker/wg-easy
sudo chown $(whoami):docker /opt/docker/wg-easy
chmod 750 /opt/docker/wg-easy
```

### 3. Copy files to the server

From your local machine:

```bash
scp deploy/wg-easy/compose.yaml holu@<SERVER_IP>:/opt/docker/wg-easy
```

With a Host alias from `~/.ssh/config` (see [Accessing the admin UI](#accessing-the-admin-ui)), write `myserver:/opt/docker/wg-easy` instead of `holu@<SERVER_IP>:/opt/docker/wg-easy`.

### 4. Set file permissions

```bash
chmod 640 /opt/docker/wg-easy/compose.yaml
```

### 5. Start wg-easy

```bash
cd /opt/docker/wg-easy && docker compose up -d
```

## Accessing the admin UI

The web UI is bound to `127.0.0.1:51821` on the server. To access it, open an SSH tunnel from your local machine:

```bash
# With a Host alias from ~/.ssh/config
ssh -L 51821:127.0.0.1:51821 -N myserver

# Typed out, without an alias
ssh -L 51821:127.0.0.1:51821 -N holu@<SERVER_IP>
```

A Host alias is a short name for a server that you define once in the file `~/.ssh/config` on your local machine. The entry stores the address and the user:

```
Host myserver
    HostName <SERVER_IP>
    User holu
```

With it, `ssh myserver` does the same as `ssh holu@<SERVER_IP>`. Both commands above open the same tunnel.

| Flag                    | Meaning                                              |
|-------------------------|------------------------------------------------------|
| `51821:127.0.0.1:51821` | Forward local port 51821 to server's 127.0.0.1:51821 |
| `-N`                    | Don't open a shell, only hold the tunnel open        |
| `myserver`              | SSH host alias (as defined in `~/.ssh/config`)       |
| `holu@<SERVER_IP>`      | User and server address, typed out                   |

Optional: if you do not want to remember the `-L` part, add a dedicated entry to `~/.ssh/config`. `LocalForward` is the config file form of `-L`:

```
Host myserver-admin
    HostName <SERVER_IP>
    User holu
    LocalForward 51821 127.0.0.1:51821
```

Then open the tunnel with:

```bash
ssh -N myserver-admin
```

Your plain alias `ssh myserver` stays a normal login without a tunnel. Only `myserver-admin` opens port 51821 on your local machine.

While the tunnel is running, open your browser and go to:

```
http://localhost:51821
```

On the first visit, the wg-easy setup wizard asks you to create the admin account: a username and a password of at least 12 characters. Store the password in your password manager. Then choose **No** for an existing setup, and enter the public host clients connect to (`<SERVER_IP>` or a name such as `vpn.example.com`) and port `51820`. After the setup, log in with that username and password. When you're done, close the tunnel with `Ctrl+C`.

## Adding VPN clients

1. Open the admin UI via SSH tunnel (see above)
2. Click **"+ New"** to create a client
3. Download the configuration file or scan the QR code with the WireGuard app
4. Connect from your device and verify at [https://ifconfig.me](https://ifconfig.me)

## Updating

```bash
cd /opt/docker/wg-easy
docker compose pull
docker compose up -d
docker image prune -f
```

## Why no Caddy / subdomain?

The admin UI manages the entire VPN – adding and removing peers, viewing traffic. Exposing it to the internet (even behind a password) adds unnecessary attack surface. Using an SSH tunnel means:

- The UI has **zero** internet exposure
- Authentication relies on your **SSH key** – no passwords to brute-force
- No DNS record, TLS certificate, or Caddy configuration needed
- The only public port is **UDP 51820** (WireGuard protocol itself)
