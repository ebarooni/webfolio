# Server housekeeping

Step by step guide to routine maintenance tasks for a VPS on Hetzner.

## Updating the OS

SSH into the server and run:

```bash
ssh holu@<SERVER_IP>
```

Update the package list and upgrade installed packages:

```bash
sudo apt update && sudo apt upgrade -y
```

If a kernel upgrade was applied, reboot the server:

```bash
sudo reboot
```

After the server comes back up, verify it is reachable:

```bash
ssh holu@<SERVER_IP>
```

## Updating a service

Navigate to the service directory and pull the latest image:

```bash
cd /opt/docker/webfolio
docker compose pull
docker compose up -d
```

`docker compose pull` fetches the latest version of the image specified in `.env`. `docker compose up -d` detects that the image has changed and recreates only the affected container. Other services are not touched.

Remove old, unused images afterwards:

```bash
docker image prune -f
```

## Checking service health

### Caddy

```bash
cd /opt/docker/caddy && docker compose ps
```

### Application logs

```bash
cd /opt/docker/webfolio && docker compose logs -f --tail=50
```

Press `Ctrl+C` to stop following logs.

## Disk usage

Check overall disk usage:

```bash
df -h
```

Check Docker-specific disk usage (images, containers, volumes, build cache):

```bash
docker system df
```

If disk usage is high, run a full Docker cleanup. This removes all unused containers, networks, images, and build cache:

```bash
docker system prune -f
```

> **Warning:** Do not add `--volumes` unless you are certain the data is no longer needed. This cannot be undone.

## Fail2Ban

Check whether Fail2Ban is active and review recent bans:

```bash
sudo fail2ban-client status sshd
```

If the service has stopped for any reason, restart it:

```bash
sudo systemctl restart fail2ban
```

## Firewall

Check the current UFW status and active rules:

```bash
sudo ufw status
```

## Routine schedule

| Frequency            | Task                                                               |
|----------------------|--------------------------------------------------------------------|
| On every deploy      | `docker compose pull && up -d`, then `image prune -f`              |
| Weekly               | `apt update && upgrade`, review application logs                   |
| Monthly              | `docker system prune -f`, check disk usage, review Fail2Ban status |
| After kernel upgrade | `sudo reboot`, verify services come back up                        |
