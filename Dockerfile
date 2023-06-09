###############################################################################
# Node JS
###############################################################################

FROM splintnet/alpine-node:18 as runner
LABEL maintainer="j.imping@splintnet.de"

RUN npm install pm2 pnpm -g

WORKDIR /application

# Install NPM Packages
COPY package.json pnpm-lock.yaml ./

RUN yarn install

COPY . .

RUN yarn build

CMD ["pm2-runtime", "ecosystem.config.js"]
