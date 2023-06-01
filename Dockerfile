FROM node:10-alpine
EXPOSE 3000
WORKDIR opt/app
ADD package*.json ./
RUN rm package-lock.json ./
RUN rm -Rfv node_modules
RUN npm install 
ADD . .
CMD ["yarn", "start"]
