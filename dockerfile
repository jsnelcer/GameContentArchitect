FROM node:lts-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --prefer-offline

COPY . .

RUN npm run build

RUN npm prune --production --omit=dev # remove devDependencies

FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]