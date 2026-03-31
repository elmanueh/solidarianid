FROM node:24-alpine AS builder
WORKDIR /app

# Copiar dependencias
COPY package*.json ./
RUN npm ci && npm cache clean --force

# Copiar código fuente
COPY . ./
# Construir todas las apps
RUN npm run build -- users
RUN npx tsc -p apps/users/tsconfig.migrations.json

# Etapa de producción
FROM node:24-alpine AS production
WORKDIR /app

# Instalar dumb-init
RUN apk add --no-cache dumb-init \
  && addgroup -g 1001 -S nodejs \
  && adduser -S nestjs -u 1001

# Copiar dependencias de producción
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copiar solo la app users construida
COPY --from=builder --chown=nestjs:nodejs /app/dist/apps/users ./dist/apps/users
RUN touch /app/users-swagger.yaml && chown nestjs:nodejs /app/users-swagger.yaml

EXPOSE 3001

USER nestjs
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/apps/users/main.js"]
