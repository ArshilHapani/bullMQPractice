FROM oven/bun:slim

# Create app directory
WORKDIR /app

COPY package.json bun.lockb ./

RUN cd /app && bun install --frozen-lockfile --production

COPY . .

ENV NODE_ENV=production

USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun","start" ]