# Blockchain Explorer API Coding Challenge

This project consists of an API developed in Node.js and TypeScript that interacts with a GraphQL API to retrieve information about blocks in a blockchain. This README provides an overview of the project architecture and the design principles adopted.

## Project Structure

The project is organized into several main folders:

- `config`: Contains general configurations and environment variable management.
- `infra/http/controllers`: Controllers that process HTTP requests.
- `services`: Contains business logic and services that interact with external APIs.
- `types`: Definitions of types and interfaces for TypeScript.
- `utils`: Utility functions, such as cache management.

## Applied SOLID Principles

1. **Single Responsibility Principle (SRP)**:

   - **environments.ts**: Isolated to load and validate environment variables.
   - **block.controller.ts**: Focused on handling requests related to "block".
   - **block.service.ts**: Responsible for the business logic related to block retrieval.

2. **Open/Closed Principle (OCP)**:

   - **GraphQLClient**: Can be extended without modification, as it can accept different GraphQL clients.

3. **Liskov Substitution Principle (LSP)**:

   - Interfaces such as **IBlockService** and **IGraphQLClient** are good examples of the LSP, allowing any implementation of these interfaces to be replaced without impacting the expected behavior.

4. **Interface Segregation Principle (ISP)**:

   - The interfaces are specific to each type of functionality (like `IBlockService` for block operations and `IGraphQLClient` for GraphQL requests), which prevents "fat" interfaces.

5. **Dependency Inversion Principle (DIP)**:
   - **app.ts** Injecting dependencies into `BlockService` and `BlockController` through their interfaces, not depending on concrete implementations.

<br />

# How to Run the Project

This project is a backend service written in Node.js and TypeScript, providing data on blockchain blocks. Below, you will find detailed instructions on how to install and run the project.

## Prerequisites

Before starting, make sure you have Node.js and npm installed on your machine. You will also need access to a GraphQL endpoint that provides data on blockchain blocks.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/jaquisonsferreira/conding-challenge-get-last-block-number-blockchain.git
   cd conding-challenge-get-last-block-number-blockchain
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Available Scripts

Within the project directory, you can run:

- **`npm run build`**:
  Compiles the TypeScript project to plain JavaScript in the `dist` folder.

- **`npm start`**:
  Runs the compiled version of the application from the `dist` directory.

- **`npm run dev`**:
  Starts the server in development mode using `nodemon` and `ts-node` for automatic restarts and real-time compilation.

- **`npm run start:prod`**:
  First compiles the project and then starts the server, ideal for production environments.

- **`npm test`**:
  Runs the defined tests using Jest.

- **`npm run test:watch`**:
  Runs tests in watch mode, useful during development.

- **`npm run test:coverage`**:
  Generates a test coverage report.

## Running the Project

To start the server in development mode, run:

```bash
npm run dev
```

For production environment, after ensuring all environment variables are correctly set, run:

```bash
npm run start:prod
```

## Available Routes

The server defines the following routes:

- **GET `/`**:

  - **Description**: Checks the health of the service.
  - **Response**: Returns `{ health: "ok" }`.

- **GET `/api/latest-block-number`**:
  - **Description**: Returns the most recent block number of the blockchain.
  - **Response**: Returns a JSON with the latest block number, example: `{ latestBlockNumber: 123456 }`.
  - **Errors**: Returns an HTTP 500 status with an error message if unable to fetch the latest block number.

## Final Considerations

This guide assumes you have a basic understanding of terminal/bash operations. For contributions and changes, we recommend creating specific branches and using pull requests to maintain code quality and integrity.
