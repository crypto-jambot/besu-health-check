FROM node:latest

# Create app directory
WORKDIR /usr/src/app

ARG NPM_TOKEN
ARG PORT
ENV PORT=$PORT
COPY . .
EXPOSE $PORT

CMD ["npm", "start"]