FROM buildpack-deps:jessie
EXPOSE 3000
WORKDIR opt/app
RUN apt install curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | -E bash -
RUN apt install nodejs
ENV NODE_VERSION=10.24.1
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version
RUN rm -rf node_modules
RUN rm -rf package-lock.json
RUN npm install react-scripts
RUN npm install
ADD . .
CMD ["yarn", "start"]
