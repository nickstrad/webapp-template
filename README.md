# Overview

This is a template web app to quickly start iterating on ideas. It comes wired up for remix v2 and Postgresql. It comes configured with a login flow, a logout flow, a sign up page, and a base dashboard view.

## Styling

- daisyui
- tailwind

## Dependencies

- node
- docker

## Instalation

1. `npm run i`

## Dev

1. `make db/start`
2. `npm run dev`

## Env variables

1. Put `.env` file in root directory.

```
DB_USER="user"
DB_PASSWORD=""
DB_HOST="localhost"
DB_PORT=5432
DB_NAME="undefined"
SESSION_SECRET="super-secret"
```
