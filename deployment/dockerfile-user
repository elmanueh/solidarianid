FROM node:24-alpine AS builder
WORKDIR /app

# Copiar dependencias
COPY package*.json ./
RUN npm ci && npm cache clean --force

# Copiar código fuente
COPY . ./
# Construir todas las apps
RUN npm run build -- users

# Etapa de producción
FROM node:24-alpine AS production
WORKDIR /app

# Instalar dumb-init
RUN apk add --no-cache dumb-init

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs && \
  adduser -S nestjs -u 1001

# Copiar dependencias de producción
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copiar solo la app users construida
COPY --from=builder --chown=nestjs:nodejs /app/dist/apps/users ./dist/apps/users

EXPOSE 3001

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/apps/users/main.js"]
