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
