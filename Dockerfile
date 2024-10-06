FROM openapitools/openapi-generator-cli:v7.8.0 AS generate

WORKDIR /usr/src/app

COPY . .

RUN bash /usr/local/bin/docker-entrypoint.sh generate -i api/book-api.yaml -g typescript-axios -o generated-src/api-client


FROM node:20 AS build

WORKDIR /usr/src/app

COPY --from=generate /usr/src/app .

RUN npm ci

RUN npm run build


FROM nginx:stable-alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]