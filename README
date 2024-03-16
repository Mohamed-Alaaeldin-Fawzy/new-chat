# Chat Application

## Overview

This chat application allows users to engage in private conversations or create group chats with multiple participants. It provides a backend implemented in TypeScript, featuring a flexible architecture that includes models, repositories, and controllers for users, chats, and messages.

## Features

- Private messaging between two users
- Group chat functionality with support for numerous participants
- Scalable architecture with separate models, repositories, and controllers
- Support for in-memory and MongoDB storage options
- Real-time message exchange
- CRUD operations for users, chats, and messages

## Technical Stack

- Node.js
- TypeScript
- Express
- jwt
- webSocket
- Mongoose (for MongoDB interaction)
- In-memory data storage alternative (for testing)

## Project Structure

- `index.ts`: The entry point of the application.
- `models`: Contains the `User`, `Chat`, and `Message` models defining the data structures.
- `repositories`: Includes the base repository abstract classes and specific implementations (`InMemoryRepository` and `MongoRepository`) for each model.
- `controllers`: Contains `User`, `Chat`, `Message`, and `Auth` controllers to handle the business logic.
- `routes`: contain `User`, `Chat`, `Message`, `Auth`, and `invalid` to handel the routing system.

## Getting Started

### Prerequisites

- Node.js
- MongoDB or use Mongo Atlas

### Installation

1. Clone the repository:
2. Navigate to the project directory:
3. Install dependencies:

### Running the Application

1. Start the application:
2. run `npm start` to start the app in development mode
3. The server will start on the specified port in the `.env` file, and you can begin interacting with the API.

## API Endpoints

# Authentication

- POST /register: Registers a new user.
- POST /login: Authenticates a user.

# Users

- GET /user: Retrieves all users.
- GET /user/me: Retrieves the profile of the current user.

# Chats

- GET /chat: Retrieves all chats for the current user.
- POST /chat: Creates a new chat.

# Messages

- GET /message/:chatId: Retrieves messages for a given chat.
- POST /message/:chatId: Creates a new message in a chat.
