# syntax=docker/dockerfile:1

# ---- Stage 1: build ----
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# npm run build = css:inv (Tailwind v4 cho .inv-root) + tsc --noEmit + vite build
RUN npm run build

# ---- Stage 2: serve (nginx tinh) ----
FROM nginx:1.27-alpine AS serve

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8111

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD wget -qO- http://127.0.0.1:8111/ >/dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
