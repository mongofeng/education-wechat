FROM node:10.13-alpine
# https://github.com/vuejs/vue-cli/issues/2404
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --registry=https://registry.npm.taobao.org 
ENV NODE_ENV production
COPY . .
RUN ls
CMD ["npm", "run", "build"]