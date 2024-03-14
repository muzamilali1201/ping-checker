# PingChecker

PingChecker is a Node.js application for monitoring website uptime and response times. It provides features for user authentication, website monitoring, and generating monitoring charts.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Routes](#routes)
4. [Controllers](#controllers)
5. [Middlewares](#middlewares)
6. [Utils](#utils)

## Installation

To run the PingChecker application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/PingChecker.git
   ```

2. Install dependencies:

   ```bash
   cd PingChecker
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and define the following variables:

   ```dotenv
   SECRET_KEY=your_secret_key
   user=your_email_address
   pass=your_email_password
   ```

4. Run the application:

   ```bash
   npm start
   ```

## Usage

Once the application is running, you can access the following routes:

- `/api/v1/user/register` - Register a new user.
- `/api/v1/user/login` - Login with existing credentials to obtain a JWT token.
- `/api/v1/ping` - Schedule a website for monitoring.
- `/api/v1/chart/:site` - View monitoring chart for a specific website.

Make sure to use the appropriate HTTP methods (POST, GET) and provide necessary parameters.

## Routes

### Authentication Routes

- **POST /api/v1/user/register**

  - Validates user registration data using Joi schema validation.
  - Registers a new user in the system.
  - Returns a success message and user data upon successful registration.

- **POST /api/v1/user/login**
  - Validates user login data using Joi schema validation.
  - Logs in an existing user and generates a JWT token.
  - Returns a success message, user data, and token upon successful login.

### Monitoring Routes

- **POST /api/v1/ping**

  - Middleware: `verifyToken` - Verifies JWT token for authentication.
  - Checks ping status for a website and schedules it for monitoring.
  - Returns a success message and website data upon successful scheduling.

- **GET /api/v1/chart/:site**
  - Controller: `chartController.generateMonitoringChart`
  - Fetches monitoring data for a specific website.
  - Generates a monitoring chart with response times over time.
  - Returns chart data in JSON format.

## Controllers

### Auth Controller

- **registerUser**

  - Registers a new user in the system.
  - Hashes user password using bcrypt.
  - Throws a custom error if user already exists.
  - Returns success message and user data upon successful registration.

- **loginUser**
  - Logs in an existing user.
  - Compares hashed password with provided password using bcrypt.
  - Throws a custom error if user does not exist or password is incorrect.
  - Generates a JWT token upon successful login.

### Chart Controller

- **generateMonitoringChart**
  - Fetches monitoring data for a specific website.
  - Constructs a monitoring chart with response times over time.
  - Throws a custom error if the website is not scheduled for monitoring.
  - Returns chart data in JSON format.

### Ping Controller

- **checkPing**
  - Middleware: `verifyToken` - Verifies JWT token for authentication.
  - Checks ping status for a website.
  - Schedules the website for monitoring if it's not already scheduled.
  - Returns a success message and website data upon successful scheduling.

## Middlewares

### Schema Validation Middleware

- **joiSchemaValidation**
  - Validates request data against Joi schemas.
  - Throws a custom error if validation fails.
  - Used for validating registration and login data.

### Authentication Middleware

- **verifyToken**
  - Verifies JWT token for user authentication.
  - Throws a custom error if token is missing or invalid.
  - Used for protecting routes that require authentication.

## Utils

### Ping Scheduler

- **scheduledJob**
  - Cron job for scheduling website pings at regular intervals.
  - Sends email notifications if a website goes down.
  - Sends email notifications when website goes up.
  - Stores ping data in the database.

### Mail Sender

- **mailSender**
  - Sends email notifications using Nodemailer.
  - Used for sending alerts when a website goes down.

### Custom Error Handler

- **customError**
  - Custom error class for creating custom error objects with status codes.
