FROM node:14-alpine AS development
ENV NODE_ENV development

WORKDIR /app
COPY package* ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]