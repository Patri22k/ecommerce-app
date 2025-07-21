FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
COPY src ./src

COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

RUN apt-get update && apt-get install -y netcat-traditional

EXPOSE 5000

ENTRYPOINT ["./entrypoint.sh"]