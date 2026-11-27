# Railway / any container host: build the static export, then serve `out/` with Caddy.
# (The site is `output: "export"`, so there is no Node server at runtime.)

FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .

# NEXT_PUBLIC_* are inlined at build time. Railway passes service variables as build args
# for every ARG declared here; unset ones fall back to the defaults in src/.
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_LOGIN_URL
ARG NEXT_PUBLIC_PRICING_API_URL
ARG NEXT_PUBLIC_FORM_ENDPOINT
ARG NEXT_PUBLIC_WEB3FORMS_KEY
RUN npm run build

FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/out /srv
EXPOSE 8080
