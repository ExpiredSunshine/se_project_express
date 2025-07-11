# WTWR (What to Wear?): Back End

The WTWR Back End provides a RESTful API for the What to Wear? application. It enables the following features:

- **User management**

  - Sign up new users with `name`, `avatar` (URL), `email`, and `password`
  - Sign in existing users to receive a JSON Web Token (JWT)
  - Retrieve the current user's profile (`GET /users/me`)
  - Update the current user's `name` and `avatar` (`PATCH /users/me`)

- **Clothing items**

  - List all clothing items (`GET /items`)
  - Create a new clothing item (protected; `POST /items`) with `name`, `weather` (`hot` | `warm` | `cold`), `imageUrl` (URL), and ownership set to the authenticated user
  - Delete an item only if the authenticated user is its owner (`DELETE /items/:itemId`)
  - Like an item (`PUT /items/:itemId/likes`) and unlike an item (`DELETE /items/:itemId/likes`)

- **Authorization & validation**
  - All protected routes require a valid JWT in the `Authorization: Bearer <token>` header
  - Passwords are hashed with bcrypt before storage; stored hashes are never returned to the client
  - `email`, `avatar`, and `imageUrl` fields are validated with the validator package
  - Robust error handling with appropriate HTTP status codes (400, 401, 403, 404, 409, 500)

## Accessing the Application

### Domain Information
The application is accessible via the following domains:

- **Main Domain**: `wtwrac.vlad.md`
- **WWW Subdomain**: `www.wtwrac.vlad.md`
- **API Subdomain**: `api.wtwrac.vlad.md`

### API Endpoints
- **Base URL**: `https://api.wtwrac.vlad.md`
- **Crash Test**: `GET /crash-test` - Tests server crash recovery with PM2
- **Items**: `GET /items` - List all clothing items
- **User Management**: `/users/*` - User-related endpoints
- **Authentication**: `/signin`, `/signup` - Authentication endpoints

## Technologies & Techniques Used

- **Node.js & Express.js**: Server runtime and API routing
- **MongoDB & Mongoose**: NoSQL database and ODM for schema definitions and queries
- **bcryptjs**: Password hashing
- **jsonwebtoken**: Signing and verifying JWTs for stateless authentication
- **validator**: Ensures `avatar`, `imageUrl`, and `email` fields are valid
- **CORS**: Allows cross-origin requests from the front end
- **ESLint (Airbnb Style) & Prettier**: Linting and formatting for consistent, high-quality code style
- **PM2**: Process manager for automatic crash recovery and application management
