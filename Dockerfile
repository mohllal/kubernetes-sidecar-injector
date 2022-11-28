############################## Builder ##############################
FROM node:14-slim as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

############################## Release ##############################
FROM node:14-slim as release

USER node
WORKDIR /app

COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/tsconfig.json ./
RUN npm ci --production && npm cache clean --force

COPY --from=builder --chown=node:node /app/dist ./dist

EXPOSE 8010 8443
CMD [ "npm", "start" ]