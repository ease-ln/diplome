FROM node:13-alpine
EXPOSE 3000
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN npm install
COPY . /app
CMD npm run start