FROM node:boron
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm i -S sequelize-cli
RUN npm install
COPY . /usr/src/app
RUN ./node_modules/sequelize-cli/bin/sequelize db:migrate
EXPOSE 3000
CMD [ "npm", "start" ]
