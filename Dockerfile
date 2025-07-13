# To build the image (replace <VERSION> with the actual version e.g. 1.1.0):
# docker build -t webfolio:<VERSION> .
#
# To run a container:
# docker container run -d -p 80:4200 --rm --name webfolio webfolio:<VERSION>

FROM node:22.14.0-alpine3.21

EXPOSE 4200

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
