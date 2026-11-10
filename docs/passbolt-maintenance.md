# Passbolt CE maintenance

Troubleshooting, hardening, updates and backups for the Passbolt stack from [setup-passbolt.md](setup-passbolt.md). "Setup step" in this file means a numbered step in that guide.

## Troubleshooting

**Mail problems** (no setup mail, mail in spam, domain pending). The DNS side is shared with Bitwarden, so work through [Troubleshooting in setup-mail-sending.md](setup-mail-sending.md#troubleshooting) first. Then check the Passbolt side:

```bash
cd /opt/docker/passbolt
docker compose logs passbolt | grep -i -E "smtp|mail" | tail -20
timeout 5 openssl s_client -connect smtp.resend.com:2465 -brief </dev/null
```

The `openssl` command must show a TLS connection. If the log shows an authentication error, the API key is wrong or limited to another domain. If it shows a TLS or connection error, check the two forms in [Reuse your mail setup](setup-passbolt.md#reuse-your-mail-setup): `ssl://` host with port 2465, or plain host with port 587 and `EMAIL_TRANSPORT_DEFAULT_TLS=true`. Recreate the container after every `settings.env` change: `docker compose up -d --force-recreate`. A restart does not read the file again.

**Caddy returns `502 Bad Gateway`.** Caddy cannot reach `passbolt:4433`. Check `docker network inspect passbolt`. If `caddy` is missing, Caddy is not on the network (setup step 4) and needs `docker compose up -d` in `/opt/docker/caddy`, not a reload. If `passbolt` is missing, run `docker compose up -d` in `/opt/docker/passbolt` and read its logs.

**Caddy does not start: `network passbolt declared as external, but could not be found`.** Create it once with `docker network create passbolt`, then start Caddy again.

**Setup or recovery links in mail point to `passbolt.local` or the wrong name.** `APP_FULL_BASE_URL` is wrong. Fix `settings.env`, recreate the container, and request a new link. Old links keep the old address.

**The healthcheck reports GPG errors, or login fails after a restore.** The server GPG key and the database do not belong together, or the key is not in the keyring. See [Restore](#restore). Do not delete the GPG volume to "start fresh" while the database holds items you need. That deletes the only way to decrypt them.

**The browser shows `ERR_TOO_MANY_REDIRECTS`, or `curl` on the status URL returns `302` to the same URL.** Caddy sends plain HTTP to port 8080, and Passbolt redirects to HTTPS without end. Use the Caddy block from setup step 8, which connects to `https://passbolt:4433`, then reload Caddy. Do not set `PASSBOLT_SSL_FORCE=false` to stop the loop. That hides the cause and makes the setup less safe.

**The page loads but shows a security warning.** Check that `APP_FULL_BASE_URL` starts with `https://`, that `PASSBOLT_SSL_FORCE=true` is set, and that the Caddy block is the one from setup step 8. Then run the healthcheck from setup step 9 again. If you changed the URL, clear the browser site data for `passbolt.example.com` and set up the extension again.

**The healthcheck reports `The server OpenPGP key is not set` on a stack that works.** The command ran without `source /etc/environment`. Use the full command from setup step 9.

**The database container restarts or reports access denied.** `MYSQL_PASSWORD` and `DATASOURCES_DEFAULT_PASSWORD` differ, or the password was changed after the first start. MariaDB sets the password only when it creates the database. Changing `settings.env` later does not change the stored password. A password with quotes or other special characters can also arrive changed, so use a hex value (setup step 6). Either set both lines back to the first password, or change the password inside MariaDB. For a fresh trial with no items yet, the clean path is `docker compose down -v` and a new first start. That deletes the trial data.

**The database container restarts with `failed switching to 'mysql': operation not permitted`.** The `user: mysql` line is missing from the `db` service in `compose.yaml`. The service drops all capabilities, so it cannot start as root and switch user. Copy `deploy/passbolt/compose.yaml` again.

**TOTP codes are always wrong.** The server clock or the phone clock is off. Check `timedatectl status` on the VPS (setup step 3) and the time setting on the phone. Both must be automatic.

## Hardening

- **MFA on, setup key offline** – setup step 13. An admin account without MFA is the weakest point of this setup, because there is no separate admin panel to hide.
- **Recovery kit offline** – setup step 12. It is a password equivalent. It does not belong in cloud storage or in the vault itself.
- **No published ports** – `sudo ss -tulpn` must show no `3306`, `8080` or `4433` from this stack. MariaDB must not be reachable from any other container than `passbolt`: `docker network inspect passbolt-db` lists only `passbolt` and `passbolt-db` and shows `"Internal": true`. `docker network inspect passbolt` lists only `caddy` and `passbolt`.
- **Self-registration off** – keep `PASSBOLT_PLUGINS_SELF_REGISTRATION_ENABLED=false`. Create users by hand as admin.
- **Separate SMTP key** – setup step 2. Revoke the `passbolt` key alone if it leaks.
- **HTTPS only** – `curl -sI http://passbolt.example.com` must return a redirect to HTTPS, and the healthcheck from setup step 9 must pass its SSL section.
- **Monitoring** – add a monitor for `https://passbolt.example.com/healthcheck/status.json` in Uptime Kuma. See [setup-monitoring.md](setup-monitoring.md).
- **Server basics** – the SSH, update and firewall lines in [setup-bitwarden.md](setup-bitwarden.md), Hardening, protect this stack in the same way. They are not repeated here.

## Updating

Check the [Passbolt releases](https://github.com/passbolt/passbolt_api/releases) about once a month, and at once for security releases.

1. Take a backup first (see [Backups](#backups)) and copy it off the server.
2. Run the healthcheck (setup step 9) and save the output.
3. Find the new `-ce-non-root` tag on [Docker Hub](https://hub.docker.com/r/passbolt/passbolt/tags) and its digest:

```bash
docker buildx imagetools inspect passbolt/passbolt:<NEW_TAG>-ce-non-root | grep -m1 Digest
```

4. Change the tag and the digest in `deploy/passbolt/compose.yaml`, copy it to the server, then:

```bash
cd /opt/docker/passbolt
docker compose pull
docker compose up -d
docker compose exec passbolt bash -c 'source /etc/environment; /usr/share/php/passbolt/bin/cake passbolt healthcheck'
curl -s https://passbolt.example.com/healthcheck/status.json
docker image prune -f
```

5. Log in through the extension and open an item, including one TOTP item.

The new image migrates the database on start. An old image may not work with a migrated database. To roll back, restore the backup from step 1 and use the old image. Update MariaDB 10.11 only within its supported line, and back up before any database image change.

## Backups

A Passbolt restore needs four parts. Missing one makes the rest useless:

| Part | Where it is | Why you need it |
|---|---|---|
| Database dump | MariaDB in `database_volume` | Users, permissions and the encrypted secrets |
| Server GPG key | `gpg_volume`, `/etc/passbolt/gpg` | Decrypts what the database holds |
| JWT keys | `jwt_volume`, `/etc/passbolt/jwt` | Login tokens. Less critical than GPG, still back it up |
| `settings.env` | `/opt/docker/passbolt/settings.env` | Database password, SMTP key, public URL |

Take a manual backup before every change, and store it off the server with the same care as the Bitwarden backups:

```bash
mkdir -p ~/passbolt-backup-$(date +%F)
cd ~/passbolt-backup-$(date +%F)
docker compose -f /opt/docker/passbolt/compose.yaml exec -T db \
  sh -c 'mariadb-dump -upassbolt -p"$MYSQL_PASSWORD" --single-transaction passbolt' > passbolt-db.sql
docker compose -f /opt/docker/passbolt/compose.yaml exec -T passbolt \
  tar -C /etc/passbolt -cf - gpg/serverkey.asc gpg/serverkey_private.asc jwt/jwt.key jwt/jwt.pem > passbolt-keys.tar
cp /opt/docker/passbolt/settings.env ./settings.env
chmod 600 passbolt-db.sql passbolt-keys.tar settings.env
tail -n 1 passbolt-db.sql
tar -tf passbolt-keys.tar
```

**Expected result:** the last line of the dump is `-- Dump completed on <date>`, and the archive lists four files.

**Why this form:** the `db` container already has the database password as `MYSQL_PASSWORD`. The single quotes make the shell in the container read it, so the password is not in your shell history or in the process list of the host. `--single-transaction` gives a consistent dump without locks. `tar` keeps the file modes of the keys.

Then copy the whole folder off the server and delete the copy on the server. `passbolt-keys.tar` holds a private key. Encrypt the backup folder before it leaves the server if your offsite storage is not already encrypted.

### Restore

Do these steps on a fresh stack, in the backup folder:

1. Put `settings.env` back into `/opt/docker/passbolt` and start the stack once (setup step 9). This creates an empty database and new keys.
2. Stop Passbolt and load the dump:

```bash
docker compose -f /opt/docker/passbolt/compose.yaml stop passbolt
docker compose -f /opt/docker/passbolt/compose.yaml exec -T db \
  sh -c 'mariadb -upassbolt -p"$MYSQL_PASSWORD" passbolt' < passbolt-db.sql
```

3. Start Passbolt, put the keys back, and recreate the container. The start script imports the restored server key into the keyring:

```bash
docker compose -f /opt/docker/passbolt/compose.yaml start passbolt
docker compose -f /opt/docker/passbolt/compose.yaml exec -T passbolt \
  tar -C /etc/passbolt -xf - < passbolt-keys.tar
docker compose -f /opt/docker/passbolt/compose.yaml up -d --force-recreate passbolt
```

4. Run the healthcheck from setup step 9. The GPG section must pass. Then log in and open an item.

If the healthcheck reports that the GPG key is not in the keyring, see the [official backup guide](https://www.passbolt.com/docs/hosting/backup/from-docker/). Only a restore test proves the backup: restore on a scratch server, log in and open an item.

Note the difference to Bitwarden: there is no built-in daily backup archive here. Until you add a scheduled job (for example the same restic plan as in [setup-bitwarden.md](setup-bitwarden.md#backups-planned), with scope `/opt/docker/passbolt` plus a nightly dump of the database and the two key volumes), backups are manual. Do that scheduled job before the end of the trial if you keep Passbolt.
