FROM node:13-alpine
EXPOSE 3000
WORKDIR /app
ADD . .
RUN yarn cache clean
RUN npm install 
CMD ["yarn", "start"]