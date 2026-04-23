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
ssh -L 51821:localhost:51821 -N holu
```

| Flag                    | Meaning                                              |
|-------------------------|------------------------------------------------------|
| `51821:localhost:51821` | Forward local port 51821 to server's localhost:51821 |
| `-N`                    | Don't open a shell, only hold the tunnel open        |
| `holu`                  | SSH host (as defined in `~/.ssh/config`)             |

While the tunnel is running, open your browser and go to:

```
http://localhost:51821
```

Log in with the password you chose in step 4. When you're done, close the tunnel with `Ctrl+C`.

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

The admin UI manages the entire VPN – adding and removing peers, viewing traffic. Exposing it to the internet (event behind a password) adds unnecessary attack surface. Using an SSH tunnel means:

- The UI has **zero** internet exposure
- Authentication relies on your **SSH key** – no passwords to brute-force
- No DNS record, TLS certificate, or Caddy configuration needed
- The only public port is **UDP 51820** (WireGuard protocol itself)
