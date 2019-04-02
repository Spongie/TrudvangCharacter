FROM node:10
RUN mkdir -p /app
ENV PORT 80
ENV DB_IP db
WORKDIR /app
COPY . /app/
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN npm install
RUN $(npm bin)/ng build --prod --output-path=dist
RUN chmod +x /wait
CMD /wait && node server.js