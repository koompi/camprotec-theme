FROM node:18-slim AS base
ARG ROOTPROJ
ARG THEMEPATH
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY ${ROOTPROJ}/. /app
COPY ${THEMEPATH}/. /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --force

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --force
RUN pnpm run build

FROM base
COPY --from=prod-deps /app/node_modules /app
COPY --from=build /app/.next /app
EXPOSE 3000
CMD [ "pnpm", "run", "start"]