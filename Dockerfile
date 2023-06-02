FROM node:13-alpine

ADD package-lock.json /package-lock.json
ADD package.json /package.json

# Again, I'm using yarn. Use npm install in case you're using npm
# Not sure why production should be false, but I had some issues when using regular yarn install
RUN npm install

# Adding the actual code
WORKDIR /app
ADD . /app

RUN nom run build

EXPOSE 3000
