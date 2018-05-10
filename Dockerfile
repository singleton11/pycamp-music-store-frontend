FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080

RUN /bin/bash -c  "npm run build"
CMD [ "npm", "start" ]
