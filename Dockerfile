FROM node:12-alpine
EXPOSE 3000
WORKDIR /
ADD . .
RUN yarn install
CMD ["yarn", "start"]