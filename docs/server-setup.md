# Server setup

Step by step guide to setting up a VPS on Hetzner.

## Step 1: Creating a server

Head to Hetzner and open a project. Then create a server resource with the desired specification.

### Install Docker

The following options can be used to install Docker on a Hetzner server:

- Select Docker when setting up a server from the UI
- Manual installtion: [Installing Docker on Ubuntu/Debian](https://community.hetzner.com/tutorials/howto-docker-install)

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

If successfull, disable root login and password authentication . Edit the SSH config:

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

Open the local config. Look for `[sshd]` section and ensure its enabled:

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

At this point, a new user with sudo privileges is create and SSH key login (no passwords, root login disabled), Firewall, and Fail2Ban protects the server against brute-force attempts.
