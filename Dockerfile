FROM node:lts-alpine AS build

ARG BUILD_VARIABLE
ARG INITIAL_RUNTIME_VARIABLE="Runtime set by Docker"
ARG INITIAL_NEXT_PUBLIC_VARIABLE="Public variable set by Docker"

WORKDIR /srv/app
COPY package*.json ./
RUN npm ci

COPY . .

ENV NODE_ENV=production RUNTIME_VARIABLE=${INITIAL_RUNTIME_VARIABLE} NEXT_PUBLIC_VARIABLE=${INITIAL_NEXT_PUBLIC_VARIABLE}

RUN npm run build && npm prune --production

FROM gcr.io/distroless/nodejs:14

COPY package.json next.config.js ./
COPY --from=build /srv/app/node_modules ./node_modules
COPY --from=build /srv/app/.next ./.next

CMD ["node_modules/next/dist/bin/next", "start"]
