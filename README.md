# WTWR (What to Wear?): Back End

## Description & Functionality

The WTWR Back End provides a RESTful API for the What to Wear? application. It enables clients to:

- Create, retrieve, and manage user profiles (name and avatar URL).
- Create, retrieve, update, and delete clothing items with associated weather categories.
- Allow users to like or unlike clothing items.
- Handle errors with standardized HTTP status codes.

## Technologies & Techniques Used

- **Node.js & Express.js**: Frameworks for building the API server and routing.
- **MongoDB & Mongoose**: NoSQL database and Object Data Modeling for defining schemas and interacting with the database.
- **validator**: Library used to validate that avatar and imageUrl fields contain valid URLs.
- **ESLint (Airbnb Style) & Prettier**: Linting and code formatting tools to enforce consistent, high-quality code style.
