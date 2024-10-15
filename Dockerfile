FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm prune --omit=dev

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]
