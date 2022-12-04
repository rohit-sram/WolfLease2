#FROM node:8.1.2-onbuild as builder
#ARG TARGET=production
#RUN npm install
#RUN node_modules/.bin/ng build -aot --target ${TARGET}
#
#FROM nginx:1.13-alpine
#COPY nginx.conf /etc/nginx/conf.d/
#COPY --from=builder ./src/app/dist /usr/src/app

#stage 1
FROM node:latest as node
WORKDIR /angular
COPY ./ ./
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /angular/dist/app /usr/share/nginx/html
COPY --from=node /angular/nginx.conf /etc/nginx/conf.d/default.confenter
