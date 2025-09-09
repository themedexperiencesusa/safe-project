# @bmad/services

Complex backend services, agents, and workflows for the Virtual AI Manager.

## Getting Started

### Prerequisites

- Node.js (v22.18.0 or later recommended)
- pnpm or npm

### Installation

1. Clone the repository.
2. Install dependencies:

    ```bash
    pnpm install
    ```

    or

    ```bash
    npm install
    ```

### Running the Application

To start the services, run:

```bash
pnpm start
```

or

```bash
npm start
```

This will execute `src/main.js` using Node.js.

## Scripts

- `npm start`: Starts the application.
- `npm test`: Runs tests using Jest.

## Dependencies

- `dotenv`: For loading environment variables from a `.env` file.
- `nodemailer`: For sending emails.
- `twilio`: For SMS and voice services.
