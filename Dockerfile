# syntax=docker/dockerfile:1.5

FROM node:19.4-bullseye AS build

WORKDIR /usr/src/reactutor

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.23-alpine-perl

COPY --link nginx.conf /etc/nginx/conf.d/default.conf

# ✅ Fix: correct path to built assets
COPY --link --from=build /usr/src/reactutor/dist/ /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
