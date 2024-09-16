FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# RUN psql -U greenroots -f './src/db/seeding.sql'

COPY . .

EXPOSE 3000

CMD ["node", "index"]