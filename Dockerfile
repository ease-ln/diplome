FROM node:12-alpine
EXPOSE 3000
WORKDIR opt/app
ADD . .
RUN yarn install --frozen-lockfile
CMD ["yarn", "start"]