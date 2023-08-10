FROM node:18-alpine
WORKDIR /usr/src/app
EXPOSE 3000

CMD [ -d "node_modules" ] && npm start || npm ci && npm start