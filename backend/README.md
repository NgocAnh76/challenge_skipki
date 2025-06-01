# Challenge API Skipli

API service for content and caption management application.

## Technologies Used

- Node.js
- Express.js
- TypeScript
- Firebase (Firestore)
- JWT Authentication
- Twilio (SMS)

## Installation

1. Install dependencies:

```bash
npm install
```

2. Copy the `.env.example` file and rename it to `.env.local` and change the values of the variables

3. Create a service account key file and save it to the root of the project as `serviceAccountKey.json`

4. Run the application:

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## API Documentation

### Authentication

#### Generate Access Code

```http
POST /api/auth/access-code
Content-Type: application/json

{
  "phoneNumber": "+84123456789"
}

Response:
{
  "success": true,
  "message": "Access Code Generated Successfully",
  "data": true,
  "code": 200
}
```

#### Validate Code

```http
POST /api/auth/validate-code
Content-Type: application/json

{
  "phoneNumber": "+84123456789",
  "code": "123456"
}

Response:
{
  "success": true,
  "message": "Code Validated Successfully",
  "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "code": 200
}
```

### Caption Management

#### Create Caption

```http
POST /api/caption/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "topic": "string",
  "content": "string"
}

Response:
{
  "success": true,
  "message": "Caption created successfully",
  "data": {
    "id": "uuid",
    "topic": "string",
    "content": "string",
    "phoneUser": "string",
    "createdAt": "2024-03-21T10:00:00.000Z",
    "updatedAt": "2024-03-21T10:00:00.000Z"
  },
  "code": 200
}
```

#### Get Caption

```http
GET /api/caption
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Caption fetched successfully",
  "data": [
    {
      "id": "uuid",
      "topic": "string",
      "content": "string",
      "phoneUser": "string",
      "createdAt": "2024-03-21T10:00:00.000Z",
      "updatedAt": "2024-03-21T10:00:00.000Z"
    }
  ],
  "code": 200
}
```

#### Delete Caption

```http
DELETE /api/caption/:id
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Caption deleted successfully",
  "data": true,
  "code": 200
}
```

### Error Responses

All endpoints may return the following error responses:

```json
// 400 Bad Request
{
  "success": false,
  "message": "Error message",
  "code": 400
}

// 401 Unauthorized
{
  "success": false,
  "message": "No token provided",
  "code": 401
}

// 404 Not Found
{
  "success": false,
  "message": "Content not found",
  "code": 404
}

// 500 Internal Server Error
{
  "success": false,
  "message": "Internal server error",
  "code": 500
}
```

## Project Structure

```
src/
├── common/
│   ├── constant/     # Constants and configurations
│   ├── helpers/      # Helper functions
│   ├── middlewares/  # Express middlewares
│   └── types/        # TypeScript type definitions
├── controllers/      # Route controllers
├── models/          # Data models
├── router/          # Route definitions
├── services/        # Business logic
└── app.ts           # Application entry point
```

## Features

- SMS-based user authentication
- Content and caption management
- JWT security
- Firebase Firestore integration
- SMS delivery with Twilio

## API Documentation

### Authentication Flow

1. User requests an access code by providing their phone number
2. System generates a 6-digit code and sends it via SMS
3. User validates the code to receive a JWT token
4. JWT token is used for subsequent API requests

### Content Management

- Create new content with topic and content text
- Retrieve all content for a specific user
- Delete existing content by ID
- All content operations require valid JWT token

## Error Handling

The API uses standard HTTP status codes:

- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
