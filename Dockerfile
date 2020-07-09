FROM node:14
USER node

ENV NPM_CONFIG_LOGLEVEL info

WORKDIR /home/node

COPY package*.json ./
RUN npm install

COPY . .
CMD ["npm", "start"]