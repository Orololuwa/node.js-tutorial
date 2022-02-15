FROM node:14-alpine AS development
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD [ "npm", "start:dev" ]