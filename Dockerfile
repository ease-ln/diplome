FROM node:10-alpine
EXPOSE 3000
WORKDIR /app
ADD . .
RUN npm install 
CMD ["npm", "run", "start"]