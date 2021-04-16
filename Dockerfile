FROM node:current-alpine AS build

WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"
COPY . ./

# Build app
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/jour.conf /etc/nginx/conf.d/default.conf
RUN echo "window.JOUR_BASE_URL = '/api/v1/';" > /usr/share/nginx/html/config.js
