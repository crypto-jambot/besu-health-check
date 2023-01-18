FROM node:latest

# Create app directory
WORKDIR /usr/src/app

ARG PORT
ENV PORT=$PORT
COPY . .
RUN npm run build
EXPOSE $PORT

CMD ["npm", "start"]