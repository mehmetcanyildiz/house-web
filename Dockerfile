# Angular uygulamasını inşa et
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build --configuration=stage

FROM nginx:alpine

COPY --from=build /app/dist/house-web /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
