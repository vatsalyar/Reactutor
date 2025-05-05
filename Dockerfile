FROM node:alpine AS build

WORKDIR /usr/src/reactutor

COPY package*.json .

RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm set cache /usr/src/app/.npm && \
  npm install

COPY . .

RUN npm run build

FROM nginxinc/nginx-unprivileged:alpine-perl

COPY --link --from=build /usr/src/reactutor/dist /usr/share/nginx/html

EXPOSE 8080