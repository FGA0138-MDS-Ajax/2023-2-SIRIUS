FROM node:18-alpine

RUN npm install -g yarn@latest mysql2

RUN mkdir -p /home/node/src/node_modules && chown -R node:node /home/node/src

WORKDIR /home/node/src

COPY package.json ./

RUN yarn

COPY --chown=node:node . .

EXPOSE 3001

CMD ["yarn", "dev"]
