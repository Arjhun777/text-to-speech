FROM node:18 AS build

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

FROM node:18

WORKDIR /app

COPY --from=build /app /app

WORKDIR /app

EXPOSE 5000

CMD ["npm", "run", "server"]