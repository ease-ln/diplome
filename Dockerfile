FROM node:12-alpine
EXPOSE 3000
WORKDIR opt/app
RUN npm install
ADD . .
CMD ["yarn", "start"]