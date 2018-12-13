FROM mhart/alpine-node:10

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 8080
CMD ["node", "."]
