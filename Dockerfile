FROM node:12-alpine
EXPOSE 3000
WORKDIR /
ADD . .
RUN npm ci
CMD ["npm", "run", "start"]