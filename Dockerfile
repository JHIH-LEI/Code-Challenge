FROM node:12.22-alpine3.11
COPY . /app
WORKDIR /app
RUN npm install
RUN mkdir -p /app/images
RUN apk update && apk add bash
EXPOSE 3000
CMD ["node","/app/app.js"]