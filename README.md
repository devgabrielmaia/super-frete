## Description

Technical Test - SuperFrete.

## Setup

```bash
$ docker-compose -f docker-compose-local.yml up -d --force-recreate
$ docker exec -it catalog bash
$ npm install
```

## Running the app

```bash
# emulator
$ npm run serve
```

the application will run on *http://127.0.0.1:5001/superfrete-a15bd/us-central1/api*

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## API Documentation
```bash
http://127.0.0.1:5001/superfrete-a15bd/us-central1/api/docs
```

## Insomnia Collection
```bash
./docs/Insomnia_collection.json
```

## Architecture

This service is built using NestJS, using a modular and hexagonal architecture to promote maintainability, scalability, and adherence to SOLID principles. Firebase Cloud Functions provide the serverless environment, while Firestore serves as the database for storing and managing data.


## Technology Stack

*NestJS*: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.

*Firebase Cloud Functions*: Serverless execution environment for building and connecting cloud services.

*Firestore*: A flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud Platform.
