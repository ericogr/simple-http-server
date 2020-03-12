FROM node:10-alpine

RUN addgroup -g 10000 nonroot && \
    adduser -H -u 10001 --disabled-password nonrootuser -g nonroot -s /bin/false

WORKDIR /app
COPY . .

RUN npm install
RUN chown -R nonrootuser:nonroot /app

USER nonrootuser

EXPOSE 8080
CMD ["node", "."]
