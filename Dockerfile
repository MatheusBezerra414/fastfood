# Etapa de build
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Etapa final
FROM node:22-slim

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./

# Copia o script para aguardar o banco
COPY wait-for-it.sh ./wait-for-it.sh
RUN chmod +x ./wait-for-it.sh

# Expõe a porta padrão
EXPOSE 3000

# Comando final: aguarda DB, roda seed, e inicia app
CMD ["sh", "-c", "./wait-for-it.sh $DB_HOST:5432 -- npm run seed:build && node dist/main"]