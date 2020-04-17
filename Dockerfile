FROM raspbian/stretch

COPY . /app
WORKDIR /app

RUN apt update && apt install curl -y
RUN curl -sL https://deb.nodesource.com/setup_13.x | bash -
RUN apt install nodejs -y

RUN npm i && npx tsc

CMD npm start
