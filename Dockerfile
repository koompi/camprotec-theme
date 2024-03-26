FROM node:18-slim AS base
ARG ROOTPROJ
ARG THEMEPATH
ENV NPM_HOME="/npm"
ENV PATH="$NPM_HOME:$PATH"
RUN corepack enable
COPY ${ROOTPROJ}/. /app
COPY ${THEMEPATH}/. /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=npm,target=/npm/store npm install --force

FROM base AS build
RUN --mount=type=cache,id=npm,target=/npm/store npm install --force
RUN npm run build

FROM base
COPY --from=prod-deps /app/node_modules /app
COPY --from=build /app/.next /app
EXPOSE 3000
CMD ["npm", "start"]