# To build and run with Docker:
#
#  $ docker build -t node-ts .
#  $ docker run -it --rm -p 8000:8000 node-ts
#  $ docker run -d -p 8080:8000 -e "NODE_ENV=production" --name node1 node-ts
#  $ docker run -d --net nodetest -e "NODE_ENV=production" --name node1 node-ts
#  $ docker run -d --net nodetest -e "NODE_ENV=production" --name node2 node-ts
#  $ docker run -d --net nodetest -p 8000:8000 --name node-ha-test node-ha
FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
# COPY package.json /usr/src/app/
# RUN npm install
# RUN npm run build

# Bundle app source
COPY ./node_modules/ /usr/src/app/node_modules/
COPY ./dist/ /usr/src/app/dist/
COPY ./public/ /usr/src/app/public/

EXPOSE 8080
CMD ["node", "dist/server.js"]
