## Description
this repository create a new cpatcha with canvas and store an id into redis for later check the user's attempt against saved solution.
<br />
<br />[live version](https://captcha-micro.herokuapp.com/)
<br />
<br />[workflow](https://excalidraw.com/#json=bRM8qL3hn05y8RUp3gVYg,bgn6G_1boXlJVWQrLtRs0A)

## Installation

```bash
$ yarn
```

## Environment

```bash
# render app in prod mode
NODE_ENV=production

# set hostname
HOST_NAME=localhost

# define redis configurations
REDIS_HOST=redis.host.com
REDIS_PORT=14840
REDIS_PASSWORD=redis_password

# if set to true load swagger ui
SWAGGER=true

# define http port
WEB_PORT=3000
```

## Explore documentation
### Swagger
if SWAGGER is set to "true" in environment, api documentation is accessible from ``${host}:${port}/api`` [docs for live version](https://captcha-micro.herokuapp.com/api)
### Compodoc
there's also a source documentation accessible from ```yarn src:doc``` and accessible from ``${host}:8080`` 

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test 

# test coverage
$ yarn test:cov
``` 
