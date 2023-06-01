FROM node:10-alpine
EXPOSE 3000
WORKDIR opt/app
RUN npm install 
ADD . .
CMD ["npm", "run", "start"]
