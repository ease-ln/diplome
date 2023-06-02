FROM node:13-alpine
EXPOSE 3000
WORKDIR /app
ADD . .
RUN yarn install
CMD ["yarn", "start"]