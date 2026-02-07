# GitHub Actions & Workflows Guide

A comprehensive guide to understanding GitHub Actions, CI/CD pipelines, and the ICare build workflows.

---

## Table of Contents

1. [What are GitHub Actions?](#1-what-are-github-actions)
2. [Anatomy of a Workflow File](#2-anatomy-of-a-workflow-file)
3. [The Build Web Workflow](#3-the-build-web-workflow)
4. [The Build API Workflow](#4-the-build-api-workflow)
5. [How the Workflows Work Together](#5-how-the-workflows-work-together)
6. [Understanding Each Component](#6-understanding-each-component)
7. [Common Patterns and Best Practices](#7-common-patterns-and-best-practices)

---

## 1. What are GitHub Actions?

### Overview

GitHub Actions is a CI/CD (Continuous Integration/Continuous Deployment) platform built into GitHub. It allows you to automate tasks that would otherwise be manual, such as:

- Building your application
- Running tests
- Creating Docker images
- Deploying to servers
- Sending notifications

### Core Concepts

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        GitHub Actions Hierarchy                              │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌────────────────┐
                              │   Repository   │
                              └───────┬────────┘
                                      │
                                      │ contains
                                      ▼
                         ┌────────────────────────┐
                         │  .github/workflows/    │
                         │                        │
                         │  ├── build-web.yml     │
                         │  ├── build-api.yml     │
                         │  └── deploy.yml        │
                         └───────────┬────────────┘
                                     │
                                     │ each file defines
                                     ▼
                              ┌──────────────┐
                              │   Workflow   │
                              │              │
                              │ (e.g., build │
                              │  -web.yml)   │
                              └──────┬───────┘
                                     │
                                     │ contains one or more
                                     ▼
                              ┌──────────────┐
                              │     Jobs     │
                              │              │
                              │ (run in      │
                              │  parallel or │
                              │  sequence)   │
                              └──────┬───────┘
                                     │
                                     │ contains one or more
                                     ▼
                              ┌──────────────┐
                              │    Steps     │
                              │              │
                              │ (individual  │
                              │  commands or │
                              │  actions)    │
                              └──────────────┘
```

### Key Terminology

| Term | Definition |
|------|------------|
| **Workflow** | An automated process defined in a YAML file. Triggered by events. |
| **Event** | Something that triggers a workflow (push, pull request, manual trigger, etc.) |
| **Job** | A set of steps that run on the same runner (virtual machine) |
| **Step** | An individual task within a job (run a command or use an action) |
| **Action** | A reusable unit of code (e.g., `actions/checkout@v4`) |
| **Runner** | The virtual machine that executes your workflow |
| **Artifact** | Files produced by a workflow (build outputs, logs, etc.) |

### Where Workflows Live

Workflows must be stored in the `.github/workflows/` directory at the root of your repository:

```
your-repo/
├── .github/
│   └── workflows/
│       ├── build-web.yml      # Builds web app → Docker Hub
│       ├── build-api.yml      # Builds API → DigitalOcean Registry
│       └── deploy.yml         # Deploys to droplet
├── packages/
│   └── ICare/
└── docker/
```

---

## 2. Anatomy of a Workflow File

Every workflow file follows a standard YAML structure:

```yaml
# 1. NAME - Human-readable name (appears in GitHub UI)
name: My Workflow

# 2. TRIGGERS - When does this workflow run?
on:
  push:                    # Run on push
    branches: [main]       # Only on main branch
  pull_request:            # Run on pull requests
  workflow_dispatch:       # Allow manual trigger
    inputs:                # Optional inputs for manual runs
      tag:
        description: 'Tag'
        required: false

# 3. ENVIRONMENT VARIABLES - Available to all jobs
env:
  NODE_ENV: production

# 4. JOBS - The actual work to do
jobs:
  job-name:
    runs-on: ubuntu-latest  # Which OS to use

    steps:
      - name: Step 1
        run: echo "Hello"

      - name: Step 2
        uses: some/action@v1
```

### Visual Breakdown

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Workflow File Structure                              │
└─────────────────────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────────────┐
  │ name: Build Web → Docker Hub                                            │
  │                                                                         │
  │ ◄─── Workflow name (displayed in GitHub Actions tab)                    │
  └─────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ on:                                                                     │
  │   workflow_dispatch:           ◄─── Trigger type                        │
  │     inputs:                                                             │
  │       tag:                     ◄─── Optional input parameter            │
  │         description: '...'                                              │
  └─────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ env:                                                                    │
  │   VITE_SITE_URL: https://...   ◄─── Global environment variables        │
  │   VITE_API_URL: /api                                                    │
  └─────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ jobs:                                                                   │
  │   build-and-push:              ◄─── Job ID (must be unique)             │
  │     runs-on: ubuntu-latest     ◄─── Runner OS                           │
  │     if: condition              ◄─── Optional condition                  │
  │                                                                         │
  │     steps:                                                              │
  │       - name: Checkout         ◄─── Step 1                              │
  │         uses: actions/checkout@v4                                       │
  │                                                                         │
  │       - name: Build            ◄─── Step 2                              │
  │         run: npm run build                                              │
  └─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. The Build Web Workflow

Located at `.github/workflows/build-web.yml`, this workflow builds your React/Remix web application and pushes it to Docker Hub.

### Complete File with Annotations

```yaml
# ═══════════════════════════════════════════════════════════════════════════
# WORKFLOW NAME
# ═══════════════════════════════════════════════════════════════════════════
# This appears in the GitHub Actions tab and in notifications
name: Build Web → Docker Hub

# ═══════════════════════════════════════════════════════════════════════════
# TRIGGERS
# ═══════════════════════════════════════════════════════════════════════════
# workflow_dispatch means this workflow is triggered MANUALLY
# (vs. automatically on push/pull_request)
on:
  workflow_dispatch:
    inputs:
      tag:
        description: 'Image tag (defaults to commit SHA)'
        required: false      # Optional - will use commit SHA if not provided
        type: string

# ═══════════════════════════════════════════════════════════════════════════
# ENVIRONMENT VARIABLES
# ═══════════════════════════════════════════════════════════════════════════
# These are available to ALL jobs and steps in this workflow
# VITE_ prefix means they're embedded into the React app at BUILD time
env:
  VITE_SITE_URL: https://icare-app.co.uk
  VITE_API_URL: /api
  VITE_SITE_NAME: ICare

# ═══════════════════════════════════════════════════════════════════════════
# JOBS
# ═══════════════════════════════════════════════════════════════════════════
jobs:
  build-and-push:
    # Which operating system to use for the runner
    runs-on: ubuntu-latest

    # Security: Only the repository owner can run this workflow
    # Prevents forks or other collaborators from pushing images
    if: github.actor == github.repository_owner

    steps:
      # ─────────────────────────────────────────────────────────────────────
      # STEP 1: Checkout code
      # ─────────────────────────────────────────────────────────────────────
      # Downloads your repository code to the runner
      # Without this, the runner has an empty filesystem
      - name: Checkout code
        uses: actions/checkout@v4

      # ─────────────────────────────────────────────────────────────────────
      # STEP 2: Debug (temporary)
      # ─────────────────────────────────────────────────────────────────────
      # Lists files and checks for package-lock.json
      # Useful for debugging build issues
      - name: Debug - list files
        run: ls -la && cat package-lock.json | head -5 || echo "No lockfile"

      # ─────────────────────────────────────────────────────────────────────
      # STEP 3: Set image tag
      # ─────────────────────────────────────────────────────────────────────
      # Determines what tag to use for the Docker image
      # Uses provided input OR falls back to the git commit SHA
      - name: Set image tag
        id: tag  # This ID lets other steps reference this step's outputs
        run: echo "tag=${{ inputs.tag || github.sha }}" >> $GITHUB_OUTPUT

      # ─────────────────────────────────────────────────────────────────────
      # STEP 4: Setup Node.js
      # ─────────────────────────────────────────────────────────────────────
      # Installs Node.js on the runner
      # Required because we need to build the React app before Dockerizing
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '24'

      # ─────────────────────────────────────────────────────────────────────
      # STEP 5: Install dependencies
      # ─────────────────────────────────────────────────────────────────────
      # Installs npm packages from package-lock.json
      # 'npm ci' is faster and more reliable than 'npm install' for CI
      - name: Install dependencies
        run: npm ci

      # ─────────────────────────────────────────────────────────────────────
      # STEP 6: Build web app
      # ─────────────────────────────────────────────────────────────────────
      # Compiles the React/Remix app
      # Creates the 'build/' folder with production-optimized code
      # The VITE_* environment variables are baked in at this point
      - name: Build web app
        run: npm run build --workspace=packages/ICare

      # ─────────────────────────────────────────────────────────────────────
      # STEP 7: Setup Docker Buildx
      # ─────────────────────────────────────────────────────────────────────
      # Buildx is Docker's extended build capabilities
      # Enables features like caching, multi-platform builds
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      # ─────────────────────────────────────────────────────────────────────
      # STEP 8: Login to Docker Hub
      # ─────────────────────────────────────────────────────────────────────
      # Authenticates with Docker Hub so we can push images
      # Credentials come from GitHub Secrets (never hardcoded!)
      - name: Log in to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      # ─────────────────────────────────────────────────────────────────────
      # STEP 9: Build and push Docker image
      # ─────────────────────────────────────────────────────────────────────
      # The main event - builds the Docker image and pushes to registry
      - name: Build and push Web image
        uses: docker/build-push-action@v5
        with:
          context: .                              # Build context (root of repo)
          file: ./packages/ICare/app/Dockerfile   # Which Dockerfile to use
          push: true                              # Actually push to registry
          tags: |                                 # Multiple tags for the image
            ${{ secrets.DOCKERHUB_USERNAME }}/icare-web:${{ steps.tag.outputs.tag }}
            ${{ secrets.DOCKERHUB_USERNAME }}/icare-web:latest
          cache-from: type=gha                    # Use GitHub Actions cache
          cache-to: type=gha,mode=max             # Save to cache for next time

      # ─────────────────────────────────────────────────────────────────────
      # STEP 10: Summary
      # ─────────────────────────────────────────────────────────────────────
      # Creates a nice summary that appears in the GitHub Actions UI
      - name: Summary
        run: |
          echo "### Web image pushed to Docker Hub 🐳" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "- \`${{ secrets.DOCKERHUB_USERNAME }}/icare-web:${{ steps.tag.outputs.tag }}\`" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "Use this tag to deploy: \`${{ steps.tag.outputs.tag }}\`" >> $GITHUB_STEP_SUMMARY
```

### Visual Flow of the Build Web Workflow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        Build Web Workflow Flow                               │
└─────────────────────────────────────────────────────────────────────────────┘

     Developer                    GitHub Actions                  Docker Hub
         │                              │                              │
         │  Manual trigger              │                              │
         │  (workflow_dispatch)         │                              │
         ├─────────────────────────────►│                              │
         │                              │                              │
         │                       ┌──────┴──────┐                       │
         │                       │  Runner     │                       │
         │                       │  (Ubuntu)   │                       │
         │                       └──────┬──────┘                       │
         │                              │                              │
         │                       ┌──────┴──────┐                       │
         │                       │ 1. Checkout │                       │
         │                       │    code     │                       │
         │                       └──────┬──────┘                       │
         │                              │                              │
         │                       ┌──────┴──────┐                       │
         │                       │ 2. Setup    │                       │
         │                       │    Node.js  │                       │
         │                       └──────┬──────┘                       │
         │                              │                              │
         │                       ┌──────┴──────┐                       │
         │                       │ 3. npm ci   │                       │
         │                       │ (install    │                       │
         │                       │  packages)  │                       │
         │                       └──────┬──────┘                       │
         │                              │                              │
         │                       ┌──────┴──────┐                       │
         │                       │ 4. npm run  │                       │
         │                       │    build    │                       │
         │                       │ (React app) │                       │
         │                       └──────┬──────┘                       │
         │                              │                              │
         │                              │  Creates build/ folder       │
         │                              │                              │
         │                       ┌──────┴──────┐                       │
         │                       │ 5. Docker   │                       │
         │                       │    build    │                       │
         │                       │ (image)     │                       │
         │                       └──────┬──────┘                       │
         │                              │                              │
         │                              │  Push image                  │
         │                              ├─────────────────────────────►│
         │                              │                              │
         │                              │                       ┌──────┴──────┐
         │                              │                       │ icare-web:  │
         │                              │                       │   <tag>     │
         │                              │                       │   latest    │
         │                              │                       └─────────────┘
         │                              │                              │
         │  Summary displayed           │                              │
         │◄─────────────────────────────┤                              │
         │                              │                              │
```

### Understanding VITE Environment Variables

The `VITE_` prefix is special for Vite-based applications (like your Remix app). These variables are **embedded into the JavaScript bundle at build time**, not read at runtime.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    Build-Time vs Runtime Variables                           │
└─────────────────────────────────────────────────────────────────────────────┘

  BUILD TIME (VITE_* variables)                RUNTIME (env variables)
  ─────────────────────────────                ────────────────────────

  ┌─────────────────────┐                      ┌─────────────────────┐
  │  env:               │                      │  environment:       │
  │    VITE_SITE_URL:   │                      │    DATABASE_URL:    │
  │    VITE_API_URL:    │                      │    API_KEY:         │
  └──────────┬──────────┘                      └──────────┬──────────┘
             │                                            │
             │ Baked into JS                              │ Read when
             │ during build                               │ app starts
             ▼                                            ▼
  ┌─────────────────────┐                      ┌─────────────────────┐
  │  bundle.js          │                      │  Node.js process    │
  │                     │                      │                     │
  │  const url =        │                      │  process.env.       │
  │  "https://..."      │                      │    DATABASE_URL     │
  │  (hardcoded)        │                      │  (from container)   │
  └─────────────────────┘                      └─────────────────────┘

  ✓ Can't change after build                   ✓ Can change without rebuild
  ✓ Works in browser (client-side)             ✓ Server-side only
  ✓ Public values only                         ✓ Can contain secrets
```

---

## 4. The Build API Workflow

Located at `.github/workflows/build-api.yml`, this workflow is simpler because the API doesn't need a Node.js build step - it's just copied into the Docker image.

### Key Differences from Build Web

| Aspect | Build Web | Build API |
|--------|-----------|-----------|
| Registry | Docker Hub | DigitalOcean Registry |
| Needs Node.js build | Yes (React app) | No (just copy files) |
| Environment variables | VITE_* baked in | Passed at runtime |
| Build context | Repository root | `./packages/ICare/express-api` |

### Why Different Registries?

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Registry Architecture                              │
└─────────────────────────────────────────────────────────────────────────────┘

  ┌─────────────────────┐              ┌─────────────────────┐
  │     Docker Hub      │              │  DigitalOcean       │
  │                     │              │  Container Registry │
  │  ┌───────────────┐  │              │  ┌───────────────┐  │
  │  │  icare-web    │  │              │  │  icare-api    │  │
  │  │               │  │              │  │               │  │
  │  │  (Public/     │  │              │  │  (Private,    │  │
  │  │   Free tier)  │  │              │  │   integrated  │  │
  │  └───────────────┘  │              │  │   with DO)    │  │
  │                     │              │  └───────────────┘  │
  └──────────┬──────────┘              └──────────┬──────────┘
             │                                    │
             │                                    │
             └────────────────┬───────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │    Droplet      │
                    │                 │
                    │  Pulls both     │
                    │  images during  │
                    │  deployment     │
                    └─────────────────┘
```

**Why this split?**
- **Docker Hub**: Free for public images, well-known, easy to use
- **DigitalOcean Registry**: Private by default, faster pulls from DO droplets (same network), integrated billing

---

## 5. How the Workflows Work Together

### The Complete CI/CD Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Complete CI/CD Pipeline                              │
└─────────────────────────────────────────────────────────────────────────────┘

  DEVELOPMENT                    BUILD                         DEPLOY
  ───────────                    ─────                         ──────

  ┌─────────┐
  │ Write   │
  │ Code    │
  └────┬────┘
       │
       │ git push
       ▼
  ┌─────────┐
  │ GitHub  │
  │ Repo    │
  └────┬────┘
       │
       │ Manual trigger (workflow_dispatch)
       │
       ├─────────────────────────┬─────────────────────────────┐
       │                         │                             │
       ▼                         ▼                             │
  ┌─────────────┐          ┌─────────────┐                     │
  │ build-web   │          │ build-api   │                     │
  │ .yml        │          │ .yml        │                     │
  │             │          │             │                     │
  │ npm build   │          │ (no build   │                     │
  │ docker push │          │  needed)    │                     │
  │             │          │ docker push │                     │
  └──────┬──────┘          └──────┬──────┘                     │
         │                        │                            │
         ▼                        ▼                            │
  ┌─────────────┐          ┌─────────────┐                     │
  │ Docker Hub  │          │ DO Registry │                     │
  │             │          │             │                     │
  │ icare-web:  │          │ icare-api:  │                     │
  │   abc123    │          │   abc123    │                     │
  └──────┬──────┘          └──────┬──────┘                     │
         │                        │                            │
         └───────────┬────────────┘                            │
                     │                                         │
                     │ Both images ready                       │
                     │                                         │
                     │         Manual trigger with tag         │
                     │◄────────────────────────────────────────┤
                     │                                         │
                     ▼                                         │
              ┌─────────────┐                                  │
              │ deploy.yml  │◄─────────────────────────────────┘
              │             │
              │ SSH into    │
              │ droplet     │
              │             │
              │ docker pull │
              │ docker up   │
              └──────┬──────┘
                     │
                     ▼
              ┌─────────────┐
              │   Droplet   │
              │             │
              │ Running:    │
              │ - web       │
              │ - api       │
              │ - db        │
              │ - caddy     │
              └─────────────┘
```

### Workflow Execution Order

The workflows are designed to be run manually in sequence:

```
  ┌─────────────────────────────────────────────────────────────────────────┐
  │                    Recommended Execution Order                           │
  └─────────────────────────────────────────────────────────────────────────┘

  1. Run build-web.yml     ──────►  Creates icare-web:abc123
       │
       │  (Note the tag from summary)
       │
  2. Run build-api.yml     ──────►  Creates icare-api:abc123
       │
       │  (Use same tag for consistency)
       │
  3. Run deploy.yml        ──────►  Deploys both with tag abc123
       │  (input: abc123)
       │
       ▼
     Application is live!
```

---

## 6. Understanding Each Component

### Triggers (`on:`)

```yaml
on:
  workflow_dispatch:      # Manual trigger via GitHub UI or API
    inputs:
      tag:
        description: 'Image tag'
        required: false
        type: string
```

**Common trigger types:**

| Trigger | Description | Example |
|---------|-------------|---------|
| `push` | When code is pushed | `on: push` |
| `pull_request` | When PR is opened/updated | `on: pull_request` |
| `workflow_dispatch` | Manual trigger | `on: workflow_dispatch` |
| `schedule` | Cron-based schedule | `on: schedule: - cron: '0 0 * * *'` |
| `workflow_run` | After another workflow completes | `on: workflow_run` |

**Why we use `workflow_dispatch`:**
- Full control over when builds happen
- Can specify custom tags
- Don't waste resources on every push
- Explicit deployment process

### Secrets and Variables

```yaml
# Accessing secrets (encrypted, never logged)
${{ secrets.DOCKERHUB_TOKEN }}

# Accessing inputs (from workflow_dispatch)
${{ inputs.tag }}

# Accessing built-in variables
${{ github.sha }}           # Current commit SHA
${{ github.actor }}         # Username who triggered
${{ github.repository }}    # owner/repo
${{ github.ref }}           # Branch or tag ref
```

**How secrets work:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           GitHub Secrets Flow                                │
└─────────────────────────────────────────────────────────────────────────────┘

  GitHub Repository Settings              Workflow File
  ─────────────────────────              ─────────────

  Secrets:                               uses: docker/login-action@v3
  ┌─────────────────────────┐            with:
  │ DOCKERHUB_USERNAME=adam │ ─────────►   username: ${{ secrets.DOCKERHUB_USERNAME }}
  │ DOCKERHUB_TOKEN=dckr_xxx│ ─────────►   password: ${{ secrets.DOCKERHUB_TOKEN }}
  └─────────────────────────┘

  ⚠️  Secrets are:
      - Encrypted at rest
      - Never printed to logs (shown as ***)
      - Only available to workflows in the same repo
      - Not available in forked repos (for PRs)
```

### Step Outputs

Steps can produce outputs that other steps can use:

```yaml
# Step that creates an output
- name: Set image tag
  id: tag                    # Give this step an ID
  run: echo "tag=${{ inputs.tag || github.sha }}" >> $GITHUB_OUTPUT

# Later step that uses the output
- name: Use the tag
  run: echo "Tag is ${{ steps.tag.outputs.tag }}"
```

**How outputs flow:**

```
  Step 1 (id: tag)                      Step 2
  ────────────────                      ──────

  ┌─────────────────────┐               ┌─────────────────────┐
  │ echo "tag=abc123"   │               │ Reference:          │
  │   >> $GITHUB_OUTPUT │──────────────►│ ${{ steps.tag.     │
  │                     │               │   outputs.tag }}    │
  │ Creates output:     │               │                     │
  │   tag = "abc123"    │               │ Gets: "abc123"      │
  └─────────────────────┘               └─────────────────────┘
```

### Caching

```yaml
cache-from: type=gha        # Read from GitHub Actions cache
cache-to: type=gha,mode=max # Write to cache
```

Docker layer caching speeds up builds dramatically:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Docker Build Caching                                │
└─────────────────────────────────────────────────────────────────────────────┘

  First Build (no cache)              Second Build (with cache)
  ─────────────────────               ────────────────────────

  FROM node:24-alpine     ───────►    FROM node:24-alpine     [CACHED ✓]
        │ (download)                        │ (instant)
        ▼                                   ▼
  COPY package.json       ───────►    COPY package.json       [CACHED ✓]
        │ (copy)                            │ (instant)
        ▼                                   ▼
  RUN npm ci              ───────►    RUN npm ci              [CACHED ✓]
        │ (3 minutes)                       │ (instant!)
        ▼                                   ▼
  COPY . .                ───────►    COPY . .                [REBUILD]
        │ (quick)                           │ (quick)
        ▼                                   ▼
  Done: 4 minutes                     Done: 30 seconds

  Cache stored in                     Cache read from
  GitHub Actions                      GitHub Actions
```

### Conditional Execution

```yaml
if: github.actor == github.repository_owner
```

This condition ensures only the repository owner can run the workflow. This is a security measure to prevent:
- Forked repos from pushing to your Docker Hub
- Collaborators from deploying without permission

---

## 7. Common Patterns and Best Practices

### Pattern: Fail Fast

```yaml
steps:
  - name: Check something important
    run: |
      if [ ! -f package-lock.json ]; then
        echo "Error: package-lock.json not found!"
        exit 1
      fi
```

### Pattern: Conditional Steps

```yaml
- name: Deploy to production
  if: github.ref == 'refs/heads/main'
  run: ./deploy.sh

- name: Deploy to staging
  if: github.ref == 'refs/heads/develop'
  run: ./deploy-staging.sh
```

### Pattern: Matrix Builds

```yaml
jobs:
  test:
    strategy:
      matrix:
        node-version: [18, 20, 22]
        os: [ubuntu-latest, macos-latest]

    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
```

### Pattern: Job Dependencies

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: npm run build

  test:
    needs: build        # Waits for 'build' to complete
    runs-on: ubuntu-latest
    steps:
      - run: npm test

  deploy:
    needs: [build, test]  # Waits for both
    runs-on: ubuntu-latest
    steps:
      - run: ./deploy.sh
```

```
  ┌─────────┐
  │  build  │
  └────┬────┘
       │
       ▼
  ┌─────────┐
  │  test   │
  └────┬────┘
       │
       ▼
  ┌─────────┐
  │ deploy  │
  └─────────┘
```

### Best Practices Summary

| Practice | Why |
|----------|-----|
| Use `npm ci` instead of `npm install` | Faster, more reliable in CI |
| Pin action versions (`@v4` not `@latest`) | Reproducible builds |
| Use secrets for credentials | Security |
| Add workflow summaries | Better visibility |
| Use caching | Faster builds |
| Conditional execution | Security, efficiency |
| Meaningful step names | Debugging |

---

## Quick Reference: Running the Workflows

### From GitHub UI

1. Go to your repository on GitHub
2. Click **Actions** tab
3. Select the workflow (e.g., "Build Web → Docker Hub")
4. Click **Run workflow**
5. (Optional) Enter a custom tag
6. Click **Run workflow** (green button)

### From Command Line (gh CLI)

```bash
# Run build-web workflow
gh workflow run build-web.yml

# Run with custom tag
gh workflow run build-web.yml -f tag=v1.0.0

# Run build-api workflow
gh workflow run build-api.yml -f tag=v1.0.0

# Run deploy workflow
gh workflow run deploy.yml -f tag=v1.0.0

# Check workflow status
gh run list --workflow=build-web.yml

# Watch a running workflow
gh run watch
```

---

## Summary

GitHub Actions provides a powerful way to automate your build and deployment pipeline. The ICare project uses three workflows:

1. **build-web.yml**: Builds the React app, creates a Docker image, pushes to Docker Hub
2. **build-api.yml**: Creates a Docker image for the API, pushes to DigitalOcean Registry
3. **deploy.yml**: Pulls both images and runs them on the droplet

The key insight is that these workflows are manually triggered (`workflow_dispatch`), giving you full control over when builds and deployments happen. The tag system allows you to deploy specific versions and roll back if needed.
