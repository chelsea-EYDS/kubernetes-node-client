FROM node:16-alpine3.11
WORKDIR /usr/src/app
COPY package*.json ./ 
COPY ./ ./
RUN npm ci
EXPOSE 5000
CMD ["node", "server.js"]