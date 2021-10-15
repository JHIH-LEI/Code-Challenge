FROM node:12.22-alpine3.11
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 3000
CMD ["node","app.js"]