FROM node:12

WORKDIR /app

COPY . . 

RUN npm install

RUN npm install http-server

RUN npm run build

WORKDIR /app/dist/roopali-file-reader

CMD ["http-server", "-c1"]