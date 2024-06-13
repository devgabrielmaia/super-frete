FROM node:20.12.2-alpine3.19 AS base
LABEL maintainer="Gabriel Maia"
WORKDIR /app
RUN apk update \
    && apk --no-cache add curl \
    && apk --no-cache add postgresql-dev \
    && apk --no-cache add python3 py3-pip \
    && apk --no-cache add make \
    && apk --no-cache add g++


FROM base AS runner
WORKDIR /app
ARG ENV_FILE
COPY $ENV_FILE .env
COPY package*.json ./
RUN npm install
COPY . .


FROM base as builder
WORKDIR /app
ARG ENV_FILE
COPY $ENV_FILE .env
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
