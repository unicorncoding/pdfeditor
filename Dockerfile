FROM ubuntu:focal

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install curl wget apt-utils ttfautohint -y \
    && curl -sL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get install -y  nodejs

RUN wget -O pdf2htmlEX.deb https://github.com/pdf2htmlEX/pdf2htmlEX/releases/download/continuous/pdf2htmlEX-0.18.8.rc2-master-20200820-ubuntu-20.04-x86_64.deb
# RUN apt-g update
RUN apt-get install -y ./pdf2htmlEX.deb
# RUN apt-get -f install
# RUN apt install -y libfontconfig1 libcairo2 libjpeg-turbo8 ttfautohint
# RUN apt install --fix-broken ./pdf2htmlEX.deb

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package*.json ./

RUN npm install --only=production
COPY . ./
CMD ["npm", "start"]

