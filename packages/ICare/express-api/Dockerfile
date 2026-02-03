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
