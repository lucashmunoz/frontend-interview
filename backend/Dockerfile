FROM node:20.12.0 AS builder

WORKDIR /app

COPY package*.json ./
COPY assets ./assets

RUN npm install

COPY . .

RUN npm run build

FROM node:20.12.0

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/assets ./assets

EXPOSE 4000
CMD [ "npm", "run", "start:prod" ]