# ICare Deployment Guide

A comprehensive guide to understanding the deployment infrastructure for the ICare application. This document covers SSH authentication, Docker containerisation, and orchestration with Docker Compose.

---

## Table of Contents

1. [SSH Key Authentication for GitHub Actions](#1-ssh-key-authentication-for-github-actions)
2. [Understanding Dockerfiles](#2-understanding-dockerfiles)
3. [Docker Compose Orchestration](#3-docker-compose-orchestration)
4. [Deployment Workflow](#4-deployment-workflow)
5. [Common Commands Reference](#5-common-commands-reference)

---

## 1. SSH Key Authentication for GitHub Actions

### The Challenge

When deploying from GitHub Actions to a remote server (in our case, a DigitalOcean droplet), we need a secure way for the GitHub runner to authenticate with the server. This is where SSH key pairs come into play.

The challenge we faced was threefold:

1. **Key format compatibility**: Some SSH libraries don't work well with newer ED25519 keys
2. **Secret storage limitations**: GitHub Secrets can corrupt multi-line values like SSH keys
3. **Security requirements**: SSH private keys must have strict file permissions (600)

### Understanding SSH Key Pairs

SSH uses asymmetric cryptography, which means there are two mathematically related keys:

```
┌─────────────────────────────────────────────────────────────────┐
│                     SSH Key Pair                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────┐           ┌─────────────────┐            │
│   │   Private Key   │           │   Public Key    │            │
│   │                 │           │                 │            │
│   │  - Keep secret  │  ◄─────►  │  - Share freely │            │
│   │  - Never share  │  Related  │  - Goes on      │            │
│   │  - Proves       │           │    servers you  │            │
│   │    identity     │           │    want to      │            │
│   │                 │           │    access       │            │
│   └─────────────────┘           └─────────────────┘            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

The private key is like a password that proves who you are. The public key is like a lock that only your private key can open. When you add your public key to a server's `~/.ssh/authorized_keys` file, you're essentially telling that server "trust anyone who can prove they have the matching private key."

### Generating the Key Pair

We use RSA keys rather than the newer ED25519 format because RSA has broader compatibility with various tools and libraries. The command to generate a key pair is:

```bash
ssh-keygen -t rsa -b 4096 -m PEM -f ~/digital-ocean-github
```

Let's break down each flag:

| Flag | Value | Purpose |
|------|-------|---------|
| `-t` | `rsa` | Specifies the key type. RSA is widely supported across all SSH implementations |
| `-b` | `4096` | The key size in bits. 4096 provides strong security for years to come |
| `-m` | `PEM` | Output format. PEM is the traditional format that looks like `-----BEGIN RSA PRIVATE KEY-----` |
| `-f` | `~/digital-ocean-github` | The output file path. This creates two files: the private key and `.pub` for the public key |

After running this command, you'll have two files:

```
~/digital-ocean-github       # Private key (NEVER share this)
~/digital-ocean-github.pub   # Public key (safe to share)
```

### Installing the Public Key on the Server

The public key needs to be added to the server's authorized keys file. When you SSH into the droplet, you can do this with:

```bash
# View your public key
cat ~/digital-ocean-github.pub

# On the droplet, add it to authorized_keys
echo "ssh-rsa AAAA..." >> ~/.ssh/authorized_keys
```

The server now trusts connections from anyone holding the matching private key.

### The Base64 Encoding Solution

GitHub Secrets have a problem: they can corrupt multi-line text. SSH private keys contain multiple lines with specific formatting that must be preserved exactly. If even one character is wrong, authentication fails.

The solution is to encode the key in Base64 format, which converts it to a single line of text:

```bash
# Encode the private key
base64 -i ~/digital-ocean-github | tr -d '\n'
```

This produces output like:
```
LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlKS1FJQkFBS0NBZ0VB...
```

Store this value in GitHub Secrets as `DROPLET_SSH_KEY_B64`.

### How the Workflow Uses the Key

In the GitHub Actions workflow, we decode the key and set it up for SSH:

```yaml
- name: Setup SSH key
  run: |
    mkdir -p ~/.ssh
    echo "${{ secrets.DROPLET_SSH_KEY_B64 }}" | base64 -d > ~/.ssh/deploy_key
    chmod 600 ~/.ssh/deploy_key
    ssh-keyscan -H ${{ secrets.DROPLET_HOST }} >> ~/.ssh/known_hosts
```

Here's what each line does:

1. **`mkdir -p ~/.ssh`**: Creates the SSH configuration directory if it doesn't exist. The `-p` flag prevents errors if the directory already exists.

2. **`echo "..." | base64 -d > ~/.ssh/deploy_key`**: Takes the Base64-encoded secret, decodes it back to the original private key format, and saves it to a file.

3. **`chmod 600 ~/.ssh/deploy_key`**: Sets strict file permissions. SSH refuses to use private keys that other users can read. `600` means only the owner can read and write the file.

4. **`ssh-keyscan -H ${{ secrets.DROPLET_HOST }}`**: Fetches the server's fingerprint and adds it to known_hosts. This prevents the "Are you sure you want to continue connecting?" prompt that would otherwise block automated deployments.

### The Complete Authentication Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SSH Authentication Flow                               │
└─────────────────────────────────────────────────────────────────────────────┘

  GitHub Secrets                    GitHub Runner                    Droplet
       │                                 │                              │
       │  DROPLET_SSH_KEY_B64           │                              │
       │  (Base64 encoded)              │                              │
       │                                 │                              │
       ├────────────────────────────────►│                              │
       │                                 │                              │
       │                          ┌──────┴──────┐                       │
       │                          │ Decode key  │                       │
       │                          │ base64 -d   │                       │
       │                          └──────┬──────┘                       │
       │                                 │                              │
       │                          ┌──────┴──────┐                       │
       │                          │ Set perms   │                       │
       │                          │ chmod 600   │                       │
       │                          └──────┬──────┘                       │
       │                                 │                              │
       │                                 │   SSH Connection Request     │
       │                                 ├─────────────────────────────►│
       │                                 │                              │
       │                                 │   Challenge (random data)    │
       │                                 │◄─────────────────────────────┤
       │                                 │                              │
       │                          ┌──────┴──────┐                       │
       │                          │ Sign with   │                       │
       │                          │ private key │                       │
       │                          └──────┬──────┘                       │
       │                                 │                              │
       │                                 │   Signed response            │
       │                                 ├─────────────────────────────►│
       │                                 │                       ┌──────┴──────┐
       │                                 │                       │ Verify with │
       │                                 │                       │ public key  │
       │                                 │                       │ in auth_keys│
       │                                 │                       └──────┬──────┘
       │                                 │                              │
       │                                 │   Connection Established     │
       │                                 │◄─────────────────────────────┤
       │                                 │                              │
```

### Required GitHub Secrets

For the deployment to work, you need these secrets configured in your repository:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `DROPLET_SSH_KEY_B64` | Base64-encoded RSA private key | `LS0tLS1CRUd...` |
| `DROPLET_HOST` | IP address or hostname of your droplet | `143.198.xxx.xxx` |
| `DROPLET_USER` | SSH username (usually root for droplets) | `root` |
| `DOCKERHUB_USERNAME` | Your Docker Hub username | `yourusername` |
| `DOCKERHUB_TOKEN` | Docker Hub access token | `dckr_pat_xxx` |
| `DIGITALOCEAN_ACCESS_TOKEN` | DO API token for container registry | `dop_v1_xxx` |
| `DO_REGISTRY_NAME` | Name of your DO container registry | `icare-registry` |

---

## 2. Understanding Dockerfiles

### What is a Dockerfile?

A Dockerfile is a text file containing instructions for building a Docker image. Think of it as a recipe: it specifies the base ingredients (base image), the preparation steps (commands to run), and the final presentation (how to start the application).

Each instruction in a Dockerfile creates a "layer" in the final image. Docker caches these layers, so if nothing changes in a layer, it doesn't need to be rebuilt. This is why the order of instructions matters for build performance.

### The Web Application Dockerfile

Located at `packages/ICare/app/Dockerfile`, this file builds the React/Remix web application:

```dockerfile
# Pre-build approach: expects build/ folder to already exist
# Run `npm run build:web` from repo root before building this image

FROM node:24-alpine
WORKDIR /app

# Copy Docker-specific package.json (excludes workspace dependency react-library)
COPY packages/ICare/app/package.docker.json ./package.json

# Install all production dependencies
RUN npm install --omit=dev

# Copy pre-built application
COPY packages/ICare/build ./build

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "run", "start"]
```

Let's examine each instruction in detail:

#### Base Image Selection

```dockerfile
FROM node:24-alpine
```

Every Docker image starts from a base image. We use `node:24-alpine` which combines:
- **Node.js 24**: The JavaScript runtime our application needs
- **Alpine Linux**: A minimal Linux distribution (~5MB) that keeps our image small

The Alpine variant produces images around 50MB compared to 300MB+ for full Debian-based images. Smaller images mean faster downloads, faster deployments, and lower storage costs.

#### Working Directory

```dockerfile
WORKDIR /app
```

This sets the working directory for all subsequent commands. It's equivalent to running `cd /app`, but also creates the directory if it doesn't exist. All `COPY` commands and the final `CMD` will operate relative to this directory.

#### Dependency Installation

```dockerfile
COPY packages/ICare/app/package.docker.json ./package.json
RUN npm install --omit=dev
```

We copy the package.json first, before copying application code. This is a deliberate optimisation. Docker caches each layer, and this layer only changes when dependencies change. If you only modify application code, Docker reuses the cached `node_modules` layer, making builds much faster.

The `--omit=dev` flag excludes development dependencies (testing tools, linters, etc.) from the production image, reducing size and potential security vulnerabilities.

#### Application Code

```dockerfile
COPY packages/ICare/build ./build
```

Notice we're copying a `build` folder, not source code. This is the "pre-build" approach mentioned in the comments. The React application is compiled on the developer's machine or in CI before building the Docker image. This approach:
- Keeps build tools out of the production image
- Reduces image size significantly
- Speeds up container startup (no build step needed)

#### Environment and Startup

```dockerfile
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "run", "start"]
```

- **`ENV NODE_ENV=production`**: Sets an environment variable that Node.js and many npm packages use to optimise for production
- **`EXPOSE 3000`**: Documents that the container listens on port 3000 (this is metadata, not actual port mapping)
- **`CMD ["npm", "run", "start"]`**: The command that runs when the container starts

### The API Dockerfile with Multi-Stage Builds

Located at `packages/ICare/express-api/Dockerfile`, this file uses a more advanced technique called multi-stage builds:

```dockerfile
FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY src ./src
COPY db ./db
COPY routes ./routes
COPY middleware ./middleware
COPY services ./services
COPY utlis ./utlis
COPY schemas ./schemas
COPY package.json package-lock.json ./

EXPOSE 4001
CMD ["node", "src/index.js"]
```

#### Understanding Multi-Stage Builds

Multi-stage builds allow you to use multiple `FROM` statements in a single Dockerfile. Each `FROM` starts a new stage, and you can selectively copy files from earlier stages into later ones.

```
┌─────────────────────────────────────────────────────────────────┐
│                    Multi-Stage Build Process                     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────┐
│         Stage 1: "deps"         │
│                                 │
│  FROM node:24-alpine AS deps    │
│                                 │
│  ┌───────────────────────────┐  │
│  │ package.json              │  │
│  │ package-lock.json         │  │
│  └───────────────────────────┘  │
│              │                  │
│              ▼                  │
│  ┌───────────────────────────┐  │
│  │ npm ci --omit=dev         │  │
│  │                           │  │
│  │ Creates node_modules/     │  │
│  │ (+ temporary npm cache)   │  │
│  └───────────────────────────┘  │
│                                 │
└────────────────┬────────────────┘
                 │
                 │ COPY --from=deps
                 │ (only node_modules)
                 ▼
┌─────────────────────────────────┐
│      Stage 2: Final Image       │
│                                 │
│  FROM node:24-alpine            │
│                                 │
│  ┌───────────────────────────┐  │
│  │ node_modules/ (from deps) │  │
│  │ src/                      │  │
│  │ db/                       │  │
│  │ routes/                   │  │
│  │ middleware/               │  │
│  │ services/                 │  │
│  │ schemas/                  │  │
│  │ package.json              │  │
│  └───────────────────────────┘  │
│                                 │
│  No npm cache or temp files!    │
│                                 │
└─────────────────────────────────┘
```

The first stage (`deps`) runs `npm ci` which creates node_modules plus temporary files (npm cache, logs, etc.). The second stage starts fresh and only copies the node_modules folder we need. The temporary files from stage 1 are discarded, resulting in a smaller final image.

#### npm ci vs npm install

```dockerfile
RUN npm ci --omit=dev
```

We use `npm ci` (clean install) instead of `npm install` because:
- It's faster in CI environments
- It requires a package-lock.json and uses it exactly (no unexpected updates)
- It deletes node_modules first, ensuring a clean state
- It never modifies package.json or package-lock.json

### Layer Caching Strategy

Docker builds are faster when layers can be cached. The key insight is that Docker invalidates the cache for a layer and all subsequent layers when something changes.

```
┌─────────────────────────────────────────────────────────────────┐
│                    Layer Caching Strategy                        │
└─────────────────────────────────────────────────────────────────┘

  Optimal Order                      Why This Order?
  ─────────────────────────────────────────────────────────────────

  FROM node:24-alpine          ◄── Rarely changes
         │
         ▼
  COPY package.json            ◄── Changes when dependencies change
         │                         (less frequently)
         ▼
  RUN npm install              ◄── Cached unless package.json changed
         │                         (slow step, good to cache)
         ▼
  COPY src/ ./src/             ◄── Changes frequently (your code)
         │                         (fast step anyway)
         ▼
  CMD ["node", "src/index.js"] ◄── Rarely changes

  ─────────────────────────────────────────────────────────────────

  If you COPY source code before npm install, every code change
  would invalidate the npm install cache, making builds slow.
```

---

## 3. Docker Compose Orchestration

### What is Docker Compose?

While a Dockerfile defines how to build a single container, Docker Compose defines how to run multiple containers together as a system. It handles:

- **Service definitions**: What containers to run
- **Networking**: How containers communicate
- **Volumes**: Persistent data storage
- **Dependencies**: Startup order and health checks
- **Environment**: Configuration and secrets

### Development vs Production Compose Files

We maintain two separate compose files for different environments:

| File | Purpose | Services |
|------|---------|----------|
| `docker-compose.dev.yml` | Local development | Database, pgAdmin only |
| `docker-compose.prod.yml` | Production deployment | All services including app |

In development, you run the web and API directly on your machine (with hot reloading), while the database runs in Docker. In production, everything runs in containers.

### The Development Compose File

Located at `docker/docker-compose.dev.yml`:

```yaml
# Development docker-compose - local database only
# Usage: docker compose -f docker-compose.dev.yml up -d

services:
  db:
    image: postgres:16
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    ports:
      - "5432:5432"
    volumes:
      - icare_pgdata_local:/var/lib/postgresql/data
    healthcheck:
      test: [ "CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}" ]
      interval: 5s
      timeout: 5s
      retries: 10

  pgadmin:
    image: dpage/pgadmin4:8
    restart: unless-stopped
    environment:
      PGADMIN_DEFAULT_EMAIL: ${PGADMIN_DEFAULT_EMAIL}
      PGADMIN_DEFAULT_PASSWORD: ${PGADMIN_DEFAULT_PASSWORD}
    ports:
      - "5050:80"
    depends_on:
      db:
        condition: service_healthy

volumes:
  icare_pgdata_local:
```

#### Service Configuration Deep Dive

**The `image` directive** specifies which Docker image to use. `postgres:16` pulls the official PostgreSQL version 16 image from Docker Hub.

**The `restart` policy** determines what happens when a container stops:
- `no`: Never restart (default)
- `always`: Always restart, even if manually stopped
- `unless-stopped`: Restart unless explicitly stopped by the user
- `on-failure`: Only restart if the container exits with an error

**The `environment` section** sets environment variables inside the container. The `${VARIABLE}` syntax reads values from a `.env` file or the shell environment. This keeps secrets out of the compose file itself.

**Port mapping** with `ports: - "5432:5432"` follows the format `host:container`. The first number is the port on your machine; the second is the port inside the container. In development, we expose the database directly so local applications can connect.

**Volumes** provide persistent storage. Without a volume, all data in a container is lost when it stops. The syntax `icare_pgdata_local:/var/lib/postgresql/data` mounts a named volume called `icare_pgdata_local` at the PostgreSQL data directory.

**Health checks** verify that a service is actually working, not just running:

```yaml
healthcheck:
  test: [ "CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}" ]
  interval: 5s      # Check every 5 seconds
  timeout: 5s       # Fail if check takes more than 5 seconds
  retries: 10       # Try 10 times before marking unhealthy
```

The `pg_isready` command is a PostgreSQL utility that checks if the database is accepting connections.

**Dependencies** with `depends_on` control startup order:

```yaml
depends_on:
  db:
    condition: service_healthy
```

This tells Docker Compose to wait until the database's health check passes before starting pgAdmin. Without the `condition`, Docker would only wait for the container to start, not for the database to be ready.

### The Production Compose File

Located at `docker/docker-compose.prod.yml`:

```yaml
services:
  db:
    image: postgres:16
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    ports:
      - "127.0.0.1:5432:5432"    # Only localhost can connect
    volumes:
      - icare_pgdata:/var/lib/postgresql/data
    healthcheck:
      test: [ "CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}" ]
      interval: 5s
      timeout: 5s
      retries: 10

  pgadmin:
    image: dpage/pgadmin4:8
    restart: unless-stopped
    environment:
      PGADMIN_DEFAULT_EMAIL: ${PGADMIN_DEFAULT_EMAIL}
      PGADMIN_DEFAULT_PASSWORD: ${PGADMIN_DEFAULT_PASSWORD}
    ports:
      - "127.0.0.1:5050:80"      # Only localhost can connect
    depends_on:
      db:
        condition: service_healthy

  migrate:
    image: registry.digitalocean.com/${DO_REGISTRY_NAME}/icare-api:${IMAGE_TAG:-latest}
    environment:
      DATABASE_URL: postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}
    depends_on:
      db:
        condition: service_healthy
    command: [ "node", "db/scripts/run-sql.js" ]
    restart: "no"

  api:
    image: registry.digitalocean.com/${DO_REGISTRY_NAME}/icare-api:${IMAGE_TAG:-latest}
    restart: unless-stopped
    environment:
      NODE_ENV: production
      PORT: 4001
      DATABASE_URL: postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}
      PUBLIC_API_URL: ${PUBLIC_API_URL}
      PUBLIC_SITE_URL: ${PUBLIC_SITE_URL}
      RESEND_API_KEY: ${RESEND_API_KEY}
    depends_on:
      db:
        condition: service_healthy
      migrate:
        condition: service_completed_successfully
    expose:
      - "4001"

  web:
    image: ${DOCKERHUB_USERNAME}/icare-web:${IMAGE_TAG:-latest}
    restart: unless-stopped
    environment:
      NODE_ENV: production
      PORT: 3000
      API_INTERNAL_URL: http://api:4001
      SANITY_PROJECT_ID: ${SANITY_PROJECT_ID}
      SANITY_DATASET: ${SANITY_DATASET}
    depends_on:
      - api
    expose:
      - "3000"

  caddy:
    image: caddy:2
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy_data:/data
      - caddy_config:/config
    depends_on:
      - web

volumes:
  icare_pgdata:
  caddy_data:
  caddy_config:
```

#### Production-Specific Security

Notice the port binding difference between development and production:

```yaml
# Development - accessible from anywhere
ports:
  - "5432:5432"

# Production - only localhost
ports:
  - "127.0.0.1:5432:5432"
```

By binding to `127.0.0.1`, the database port is only accessible from the droplet itself, not from the internet. This is crucial for security.

#### The Migration Service Pattern

```yaml
migrate:
  image: registry.digitalocean.com/${DO_REGISTRY_NAME}/icare-api:${IMAGE_TAG:-latest}
  command: [ "node", "db/scripts/run-sql.js" ]
  restart: "no"
  depends_on:
    db:
      condition: service_healthy
```

This is a clever pattern for running database migrations. The migrate service:
1. Uses the same image as the API (so it has the migration scripts)
2. Overrides the default `CMD` with a `command` that runs migrations
3. Has `restart: "no"` so it runs once and stops
4. Other services wait for it with `condition: service_completed_successfully`

```
┌─────────────────────────────────────────────────────────────────┐
│                    Migration Service Flow                        │
└─────────────────────────────────────────────────────────────────┘

     Database                  Migrate                    API
        │                         │                        │
        │  Starting...            │                        │
        ├─────────────────────────┤                        │
        │                         │                        │
        │  Health check passes    │                        │
        ├────────────────────────►│                        │
        │                         │                        │
        │                    Runs migrations               │
        │◄────────────────────────┤                        │
        │                         │                        │
        │                    Exit code 0                   │
        │                    (success)                     │
        │                         │                        │
        │                         │  service_completed     │
        │                         ├───────────────────────►│
        │                         │                        │
        │                         │              API starts with
        │                         │              up-to-date schema
        │                         │                        │
```

#### Expose vs Ports

```yaml
api:
  expose:
    - "4001"    # Internal only

caddy:
  ports:
    - "80:80"   # External
    - "443:443"
```

- **`expose`**: Makes the port available to other containers in the same Docker network, but NOT to the outside world
- **`ports`**: Maps the port to the host machine, making it accessible externally

In our architecture, only Caddy (the reverse proxy) exposes ports to the internet. The API and web services are only accessible through Caddy.

#### Internal Docker Networking

```yaml
web:
  environment:
    API_INTERNAL_URL: http://api:4001
```

Docker Compose automatically creates a network for all services. Containers can reach each other using their service name as the hostname. When the web container makes a request to `http://api:4001`, Docker's internal DNS resolves `api` to the API container's internal IP address.

```
┌─────────────────────────────────────────────────────────────────┐
│                    Docker Network (icare_default)                │
│                                                                  │
│   ┌─────────┐      ┌─────────┐      ┌─────────┐      ┌───────┐ │
│   │   db    │      │   api   │      │   web   │      │ caddy │ │
│   │         │      │         │      │         │      │       │ │
│   │ :5432   │◄────►│ :4001   │◄────►│ :3000   │◄────►│ :80   │ │
│   │         │      │         │      │         │      │ :443  │ │
│   └─────────┘      └─────────┘      └─────────┘      └───┬───┘ │
│                                                          │     │
│        Internal connections only                         │     │
│        (service names as hostnames)                      │     │
│                                                          │     │
└──────────────────────────────────────────────────────────┼─────┘
                                                           │
                                                           ▼
                                                      Internet
                                                   (ports 80, 443)
```

#### Image Tags with Defaults

```yaml
image: ${DOCKERHUB_USERNAME}/icare-web:${IMAGE_TAG:-latest}
```

The syntax `${IMAGE_TAG:-latest}` means "use the value of IMAGE_TAG, or 'latest' if it's not set." This allows flexibility: you can deploy specific versions or default to the latest.

#### Volume Mount Types

```yaml
caddy:
  volumes:
    - ./Caddyfile:/etc/caddy/Caddyfile:ro    # Bind mount
    - caddy_data:/data                        # Named volume
    - caddy_config:/config                    # Named volume
```

There are two types of volume mounts:

1. **Bind mounts** (`./Caddyfile:/etc/caddy/Caddyfile:ro`): Map a specific file or directory from the host into the container. The `:ro` suffix makes it read-only.

2. **Named volumes** (`caddy_data:/data`): Docker-managed storage that persists across container restarts. The actual location on disk is managed by Docker.

### Service Startup Order

The production compose file creates a specific startup sequence through dependencies:

```
┌─────────────────────────────────────────────────────────────────┐
│                    Service Startup Sequence                      │
└─────────────────────────────────────────────────────────────────┘

                        ┌──────────┐
                        │    db    │
                        │ postgres │
                        └────┬─────┘
                             │
              health check passes (pg_isready)
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              │
        ┌──────────┐  ┌───────────┐         │
        │ pgadmin  │  │  migrate  │         │
        │          │  │           │         │
        └──────────┘  └─────┬─────┘         │
                            │               │
              completes successfully        │
                            │               │
                            ▼               │
                      ┌──────────┐          │
                      │   api    │◄─────────┘
                      │ express  │
                      └────┬─────┘
                           │
                           │
                           ▼
                      ┌──────────┐
                      │   web    │
                      │  remix   │
                      └────┬─────┘
                           │
                           │
                           ▼
                      ┌──────────┐
                      │  caddy   │
                      │  proxy   │
                      └──────────┘
                           │
                           │
                      Accepting
                       Traffic
```

---

## 4. Deployment Workflow

### The Complete Pipeline

The GitHub Actions workflow (`deploy.yml`) orchestrates the entire deployment:

```
┌─────────────────────────────────────────────────────────────────┐
│                    Deployment Pipeline                           │
└─────────────────────────────────────────────────────────────────┘

  Developer                 GitHub                    Droplet
      │                        │                         │
      │  Trigger workflow      │                         │
      │  (workflow_dispatch)   │                         │
      ├───────────────────────►│                         │
      │                        │                         │
      │                   ┌────┴────┐                    │
      │                   │ Checkout│                    │
      │                   │  repo   │                    │
      │                   └────┬────┘                    │
      │                        │                         │
      │                   ┌────┴────┐                    │
      │                   │ Decode  │                    │
      │                   │ SSH key │                    │
      │                   └────┬────┘                    │
      │                        │                         │
      │                        │   Create directory      │
      │                        ├────────────────────────►│
      │                        │                         │
      │                        │   SCP files             │
      │                        │   (compose, Caddyfile)  │
      │                        ├────────────────────────►│
      │                        │                         │
      │                        │   SSH: docker login     │
      │                        ├────────────────────────►│
      │                        │                         │
      │                        │   SSH: docker pull      │
      │                        ├────────────────────────►│
      │                        │                         │
      │                        │   SSH: docker compose   │
      │                        │        up -d            │
      │                        ├────────────────────────►│
      │                        │                         │
      │                        │   SSH: docker prune     │
      │                        ├────────────────────────►│
      │                        │                         │
      │                   ┌────┴────┐                    │
      │                   │ Cleanup │                    │
      │                   │ SSH key │                    │
      │                   └────┬────┘                    │
      │                        │                         │
      │  Deployment complete   │                         │
      │◄───────────────────────┤                         │
      │                        │                         │
```

### Environment File on the Droplet

The `.env.production` file lives on the droplet (not in git) and contains sensitive configuration:

```bash
# Database
POSTGRES_USER=icare
POSTGRES_PASSWORD=secure_password_here
POSTGRES_DB=icare_prod

# pgAdmin
PGADMIN_DEFAULT_EMAIL=admin@example.com
PGADMIN_DEFAULT_PASSWORD=secure_password_here

# Web (Sanity CMS)
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_VERSION=2025-01-01

# Web (public vars)
VITE_SITE_URL=https://icare-app.co.uk
VITE_API_URL=/api
VITE_SITE_NAME=ICare

# API
PUBLIC_API_URL=https://icare-app.co.uk
PUBLIC_SITE_URL=https://icare-app.co.uk
RESEND_API_KEY=re_xxx
```

This file is created manually once and persists on the server. The deployment workflow doesn't modify it.

---

## 5. Common Commands Reference

### Docker Compose Commands

```bash
# Start all services in detached mode (background)
docker compose -f docker-compose.prod.yml --env-file .env.production up -d

# Stop all services
docker compose -f docker-compose.prod.yml down

# Stop and remove volumes (WARNING: deletes data)
docker compose -f docker-compose.prod.yml down -v

# View logs (follow mode)
docker compose -f docker-compose.prod.yml logs -f

# View logs for specific service
docker compose -f docker-compose.prod.yml logs -f api

# Restart a specific service
docker compose -f docker-compose.prod.yml restart caddy

# View running containers
docker compose -f docker-compose.prod.yml ps

# Pull latest images
docker compose -f docker-compose.prod.yml pull

# Rebuild and restart a service
docker compose -f docker-compose.prod.yml up -d --build api
```

### Docker Commands

```bash
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# View container logs
docker logs <container_id>

# Execute command in running container
docker exec -it <container_id> /bin/sh

# Remove unused images
docker image prune -f

# Remove all unused resources
docker system prune -f

# View disk usage
docker system df
```

### SSH Commands

```bash
# Connect to droplet
ssh root@your-droplet-ip

# Connect with specific key
ssh -i ~/.ssh/your_key root@your-droplet-ip

# Copy file to droplet
scp local_file.txt root@your-droplet-ip:/path/on/server/

# Copy directory to droplet
scp -r local_dir/ root@your-droplet-ip:/path/on/server/
```

### Useful Debugging Commands

```bash
# Check if a port is in use
docker compose -f docker-compose.prod.yml port api 4001

# View environment variables in a container
docker compose -f docker-compose.prod.yml exec api env

# Check container resource usage
docker stats

# Inspect a container's configuration
docker inspect <container_id>

# View Docker networks
docker network ls

# Inspect a network
docker network inspect icare_default
```

---

## Summary

This deployment infrastructure consists of several interconnected components:

1. **SSH Authentication**: RSA key pairs with base64 encoding to securely connect GitHub Actions to the droplet

2. **Dockerfiles**: Instructions for building container images, using multi-stage builds for efficiency

3. **Docker Compose**: Orchestration of multiple services with proper networking, dependencies, and health checks

4. **GitHub Actions**: Automated deployment triggered manually, using secrets for sensitive data

The key principles followed are:
- **Security**: Minimal port exposure, localhost-only bindings for internal services
- **Reliability**: Health checks, restart policies, and proper dependency ordering
- **Efficiency**: Layer caching, multi-stage builds, and Alpine base images
- **Maintainability**: Separate files for different environments, clear documentation
