FROM node:latest

# Create app directory
WORKDIR /usr/src/app

COPY . .
ARG PORT
ENV PORT=$PORT
RUN npm install
RUN npm run build
EXPOSE $PORT

CMD ["npm", "start"]
