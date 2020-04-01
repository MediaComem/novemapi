# Novem API

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
- [Development](#development)
- [Production](#production)
- [Configuration](#configuration)
- [Authentication](#authentication)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```bash
git clone https://github.com/MediaComem/novemapi.git
cd novemapi
npm ci
```

## Development

Create a local environment file:

```
cp .env.sample .env
```

Change the admin token in `.env` and optionally update the rest of the
configuration to suit your local development environment.

Run the application in development mode with live code reload:

```
npm run dev
```

Visit http://localhost:3000 (if you are using the default port).

## Production

Run the application in production mode:

```
npm start
```

> Make sure to provide an admin token with `$NOVEM_ADMIN_TOKEN`, or admin routes
> will not be accessible.

## Configuration

See [`config.js`][./config.js].

In development, environment variables can be set by creating an `.env` file (see
[`.env.sample`](./.env.sample)).

## Authentication

Some API routes require administrative rights. Send the admin token as a Bearer
token in the Authorization header to access them:

```
POST /start HTTP/1.1
Authorization: Bearer MY_SECRET_ADMIN_TOKEN
```

The admin token is configured with the `$NOVEM_ADMIN_TOKEN` environment variable
when launching the API.
