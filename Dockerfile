# Angular uygulamasını inşa et
FROM node:18.17.0-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install -g npm@10.7.0

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build:stage

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/house-web /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
