# ---------- Build stage ----------
FROM node:24-alpine AS build
WORKDIR /app

# Copy manifests first for better layer caching
COPY package.json package-lock.json ./
COPY packages/ICare/package.json packages/ICare/
COPY packages/icare-components/package.json packages/icare-components/

RUN npm ci

# Copy source
COPY . .

# Build what you need (adjust as needed)
RUN npm run build --workspace=icare-components || true
RUN npm run build --workspace=icare-app

# ---------- Runtime stage ----------
FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

# Bring over runtime artifacts
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/packages ./packages

EXPOSE 8080

# Start your workspace app
CMD ["npm", "-w", "icare-app", "start"]
