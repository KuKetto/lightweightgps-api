# lightweightgps-api

An API for my [LightweightGPS project](https://github.com/KuKetto/lightweightgps/tree/master)

## Usage:

Run with docker cli:

Change port you want to forward in [docker-compose.prod.yml](https://github.com/KuKetto/lightweightgps-api/blob/master/lightweightgps/docker-compose.prod.yml) then

`docker compose -f docker-compose.prod.yml up -d`

## /users/login - POST

Waits:

`"username": "string"`

or

`"email": "string"`

and

`"password": "string"`

responds with a [jwt](https://www.jwt.io) token

## /signUp - POST

Waits:

`"username": "string"`

`"email": "string"`

`"password": "string"`

responds with a boolean

## /track - POST (requires JWT token)

Waits:

`"userID": "string"`

`"startTime": "string"`

`"endTime": "string"`

`"totalDistance": "number"`

`"averageVelocity": "number"`

`"velocities": "array"

velocities is an instance of

`Array<{from: Number, to: Number, velocity: Number}>`

responds with a boolean

## /track/{userID} - GET (requires JWT token)

responds with an instance of `Array<{trackID: string, startTime: string, endTime: string, totalDistance: Number, averageVelocity: Number}>`

## /track/data/{trackID} - GET (requires JWT token)

responds with an instance of `Array<{from: Number, to: Number, velocity: Number}>`
