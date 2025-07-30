# Rate Limiter Project

This project implements a simplified in-memory rate limiter using a fixed window counter algorithm. It provides an API for managing request limits for clients.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Examples](#examples)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd rate-limiter-project
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

## Usage

The rate limiter is designed to limit the number of requests a client can make within a specified time window. The default configuration allows for a certain number of requests per minute.

## API Endpoints

### POST /request/:client_id
- Description: Records a request made by a client.
- Parameters:
  - `client_id`: The unique identifier for the client making the request.
- Response: Returns the status of the request and the remaining allowed requests.

### GET /status/:client_id
- Description: Retrieves the current status of the client's request count and limits.
- Parameters:
  - `client_id`: The unique identifier for the client.
- Response: Returns the current request count and the limit.

### POST /admin/configure
- Description: Configures the rate limiting settings.
- Body: JSON object containing the new limits.
- Response: Returns the updated configuration.

## Examples

### Record a Request
```bash
curl -X POST http://localhost:3000/request/client1
```

### Check Status
```bash
curl http://localhost:3000/status/client1
```

### Configure Limits
```bash
curl -X POST http://localhost:3000/admin/configure -H "Content-Type: application/json" -d '{"limit": 100, "window": 60}'
```

## License
This project is licensed under the MIT License.