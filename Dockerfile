FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install


# copy . to . but do not copy .next node_modules and out
COPY . .

RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]