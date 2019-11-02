FROM node:10.15.3

WORKDIR /downloads/chrome

RUN curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add \
    && echo "deb [arch=amd64]  http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-get -y update \
    && apt-get -y install google-chrome-stable

RUN wget https://chromedriver.storage.googleapis.com/2.41/chromedriver_linux64.zip \
    && unzip chromedriver_linux64.zip \
    && mv chromedriver /usr/bin/chromedriver \
    && chown root:root /usr/bin/chromedriver \
    && chmod +x /usr/bin/chromedriver
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# RUN apt-get update && apt-get install -y wget --no-install-recommends \
#   && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
#   && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
#   && apt-get update \
#   && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont \
#   --no-install-recommends \
#   && rm -rf /var/lib/apt/lists/* \
#   && apt-get purge --auto-remove -y curl \
#   && rm -rf /src/*.deb


# ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
# RUN chmod +x /usr/local/bin/dumb-init


COPY package*.json /usr/src/app/
RUN npm install
RUN npm i puppeteer
COPY package*.json /usr/src/app/

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /usr/src/app


EXPOSE 7001
#ENTRYPOINT ["dumb-init", "--"]
CMD [ "npm","run","start:dev" ]
