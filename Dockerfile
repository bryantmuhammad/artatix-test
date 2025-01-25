FROM node

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install -g drizzle-kit

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]