FROM node:18-alpine
WORKDIR /usr/src/app
EXPOSE 5173

CMD [ -d "node_modules" ] && npm run dev || npm ci && npm run dev