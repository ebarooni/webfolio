# Server setup

Step by step guide to setting up a VPS on Hetzner.

## Step 1: Creating a server

Head to Hetzner and open a project. Then create a server resource with the desired specification.

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

