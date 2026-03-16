# Server setup

Step by step guide to setting up a VPS on Hetzner.

## Step 1: Creating a server

Head to Hetzner and open a project. Then create a server resource with the desired specification.

## Step 2: Firewall and SSH

From the Hetzner UI, navigate to the newly created server and find the firewall rules. Allow **TCP** ports:

- 22 (SSH – this can be changed later for added security)
- 80 (HTTP – web traffic)
- 443 (HTTPS - secure web traffic)
