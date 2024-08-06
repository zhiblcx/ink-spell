FROM node:20-alpine

WORKDIR /server

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

RUN npm install

RUN cp -R node_modules node_modules

COPY ./src ./src
COPY ./public ./public

COPY . .

CMD ["pnpm", "run","dev"]

EXPOSE 8800
