#FROM node:alpine
#
#WORKDIR /usr/src
#
#COPY package.json .
#
#RUN yarn install 
#
#COPY . .
#
#EXPOSE 3000
#
#CMD ["npm", "dev"]

FROM ubuntu:20.04

WORKDIR /usr/src

RUN apt-get update -y && apt-get install -y ca-certificates curl gnupg

RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -
RUN sh -c "echo deb https://deb.nodesource.com/node_18.x focal main > /etc/apt/sources.list.d/nodesource.list"
RUN sh -c "echo deb-src https://deb.nodesource.com/node_18.x focal main >> /etc/apt/sources.list.d/nodesource.list"

RUN apt-get update -y
RUN apt-get install -y nodejs

COPY . .

RUN npm install --global yarn
RUN yarn install

EXPOSE 3000

CMD ["yarn", "dev"]
