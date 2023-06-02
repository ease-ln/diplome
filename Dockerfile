EXPOSE 3000
WORKDIR opt/app
RUN apt install curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | -E bash -
RUN apt install nodejs
RUN rm -rf node_modules
RUN rm -rf package-lock.json
RUN npm install react-scripts
RUN npm install
ADD . .
CMD ["yarn", "start"]
