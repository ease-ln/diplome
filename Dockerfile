FROM node:10-alpine
EXPOSE 3000
WORKDIR opt/app
ADD package*.json ./
RUN yarn cache clean
RUN npm install 
ADD . .
CMD ["yarn", "start"]