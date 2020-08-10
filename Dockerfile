FROM node:10.15.2

WORKDIR /safetrade_web

COPY package.json

RUN npm install
RUN npm install @vue/cli@3.9.2 -g


