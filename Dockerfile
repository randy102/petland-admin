# Step 1
FROM node:12-alpine as build-step
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
RUN mkdir /app
WORKDIR /app
COPY package.json /app
COPY ckeditor5 /app/ckeditor5
RUN yarn install
COPY . /app
RUN REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL npm run build

# Stage 2
FROM nginx:stable-alpine
COPY --from=build-step /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
RUN ls /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]