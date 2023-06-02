FROM node:10-alpine
EXPOSE 3000
WORKDIR opt/app
RUN rm -rf node_modules
RUN rm -rf package-lock.json
RUN npm install react-scripts
RUN npm install
ADD . .
CMD ["yarn", "start"]
