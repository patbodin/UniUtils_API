FROM node:16-alpine3.14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

RUN npm install --quiet --production
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN chmod -R 775 /usr/src/app

#EXPOSE 8080

CMD [ "node", "index.js" ]