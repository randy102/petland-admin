# Step 1
FROM node:12-alpine as build-step
ENV NODE_ENV $NODE_ENV
ENV REACT_APP_BACKEND_URL $REACT_APP_BACKEND_URL
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL NODE_ENV=$NODE_ENV npm run build

# Stage 2
FROM nginx:1.17.1-alpine
COPY --from=build-step /app/build /usr/share/nginx/html