# OpenAI Proxy with Cost Tracking and Caching

## Overview

This Node.js project serves as a proxy for OpenAI API calls. It provides additional features such as cost tracking for various OpenAI GPT models, caching API responses to Firestore, and authorization via Bearer tokens. 

## Dependencies

- `firebase-functions`
- `firebase-admin`
- `axios`
- `crypto`

## Setup

1. Run `npm install` to install all dependencies.
2. Initialize Firebase Admin SDK with `admin.initializeApp();`.
3. Deploy functions to Firebase using the Firebase CLI.

## Environment Variables

None.

## How to Run

Deploy the functions to Firebase using the Firebase CLI.

## Data Stored

Firestore is used for persistent data storage and has the following collections:
- **openaiUsage**: Keeps track of the API usage and costs.
- **cache**: Stores API responses for a limited time.

## Logging

Firebase's built-in logger is utilized for logging info, debug, and error messages.

## License

MIT Licensed.