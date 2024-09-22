# Ticket Management System API

This is a basic Ticket Management System built with Node.js, Express, and MongoDB. The API allows users to create, read, update, and delete support tickets. Each ticket contains a title, description, status, created date, and update date.

## Features
Create a Ticket: Allows users to submit new support tickets.
Read Tickets: Users can retrieve a list of all tickets or a specific ticket by its ID.
Update a Ticket: Users can update the title, description, and status of a ticket.
Delete a Ticket: Users can delete tickets by ID.

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/nikhilpmca/ticket-management-system.git
    cd ticket-management-system
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file and replace the variable values as per your system/machine
    ```bash
    cp sample.env .env
    ```

4. Start the server:
    ```bash
    npm start
    ```

5. Start the development server:
    ```bash
    npm run dev
    ```

## Endpoints
The following API endpoints are available:

### Create a Ticket
- POST `/api/tickets`
- Request Body:
    ```
    {
        "title": "Login issue",
        "description": "User unable to login to the system"
    }
    ```
- Response:
    ```
    {
        "_id": "60d9f1145096440015b8f439",
        "title": "Login issue",
        "description": "User unable to login to the system",
        "status": "Open",
        "createdAt": "2024-09-20T12:00:00.000Z",
        "__v": 0
    }
    ```

### Get All Tickets
- GET `/api/tickets`
- Response:
    ```
    [
        {
            "_id": "60d9f1145096440015b8f439",
            "title": "Login issue",
            "description": "User unable to login to the system",
            "status": "Open",
            "createdAt": "2024-09-20T12:00:00.000Z"
        }
    ]
    ```

### Get a Ticket by ID
- GET `/api/tickets/:id`
- Response:
    ```
    {
        "_id": "60d9f1145096440015b8f439",
        "title": "Login issue",
        "description": "User unable to login to the system",
        "status": "Open",
        "createdAt": "2024-09-20T12:00:00.000Z"
    }
    ```

### Update a Ticket
- PUT `/api/tickets/:id`
- Request Body:
    ```
    {
        "title": "Updated login issue",
        "description": "User is unable to login",
        "status": "In Progress"
    }
    ```
- Response:
    ```
    {
        "_id": "60d9f1145096440015b8f439",
        "title": "Updated login issue",
        "description": "User is unable to login",
        "status": "In Progress",
        "createdAt": "2024-09-20T12:00:00.000Z"
    }
    ```

### Delete a Ticket
- DELETE `/api/tickets/:id`
- Response:
    ```
    {
        "message": "Ticket deleted successfully"
    }
    ```

## Project Structure
```bash
.
├── src
│   ├── models
│   │   └── Ticket.js       # Mongoose model for the Ticket schema
│   └── routes
│       └── tickets.js      # CRUD routes for managing tickets
├── .env                    # Environment variables
├── index.js                # Main entry point for the server
├── package.json            # NPM dependencies and scripts
└── README.md               # Project documentation
```

## Requirements
- Node.js: v20.x or higher
- MongoDB: Make sure MongoDB is installed and running locally or use MongoDB Atlas.

## Running the Application
- Make sure MongoDB is running locally or provide a MongoDB URI in the `.env` file.
- Run the application using the following command:
    ```bash
    npm start
    ```
- The server will be running at `http://localhost:3000`.

## License
This project is licensed under the MIT License.

## Author
- Nikhil Patidar
