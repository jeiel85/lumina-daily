# Build stage
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=build /app/docs ./docs
COPY server.ts ./
# We need tsx to run server.ts
RUN npm install -g tsx
ENV NODE_ENV=production
# Cloud Run sets the PORT environment variable
EXPOSE 8080
CMD ["tsx", "server.ts"]
