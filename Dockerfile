FROM node:10
RUN mkdir -p /app
ENV PORT 80
ENV DB_IP db
WORKDIR /app
COPY . /app/
RUN npm install
RUN $(npm bin)/ng build --prod --output-path=dist
EXPOSE 80
CMD node server.js