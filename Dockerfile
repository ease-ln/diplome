FROM node:12-alpine
EXPOSE 3000
WORKDIR /app
ADD . .
RUN npm install
CMD ["yarn", "start"]