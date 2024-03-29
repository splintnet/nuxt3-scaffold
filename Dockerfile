###############################################################################
# Node JS
###############################################################################

FROM splintnet/alpine-node:19 as runner
LABEL maintainer="j.imping@splintnet.de"

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN mkdir /pnpm

WORKDIR /application

RUN corepack enable

RUN pnpm config set store-dir /pnpm
RUN pnpm add -g turbo

ENV PATH="/application/bin:$PATH"

RUN npm install pm2 -g

# Install NPM Packages
COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm build

CMD ["pm2-runtime", "ecosystem.config.js"]
