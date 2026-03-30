FROM node:24-alpine AS builder
WORKDIR /app

# Copiar dependencias
COPY package*.json ./
RUN npm ci && npm cache clean --force

# Copiar código fuente
COPY . ./
# Construir todas las apps
RUN npm run build -- communities

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

# Copiar solo la app communities construida
COPY --from=builder --chown=nestjs:nodejs /app/dist/apps/communities ./dist/apps/communities
COPY --from=builder --chown=nestjs:nodejs /app/libs/grpc-common/spec ./libs/grpc-common/spec
RUN touch /app/communities-swagger.yaml && chown nestjs:nodejs /app/communities-swagger.yaml

EXPOSE 3002

USER nestjs
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/apps/communities/main.js"]
