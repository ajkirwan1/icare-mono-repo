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
