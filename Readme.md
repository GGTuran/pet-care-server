# Bike Rental System Backend

## Pawprints & Tales provides a comprehensive backend server to manage and rent pets, ensuring a seamless experience for pet owners and enthusiasts. This system allows users to rent pets for a period, with flexible return options and secure payments, making it ideal for fostering or short-term pet care needs. It’s especially beneficial for those who love animals but cannot commit long-term.The server offers exciting features such as robust authentication and authorization to secure user data, admin-controlled pet management to ensure proper care and availability, and a streamlined rental process. This system is designed to provide peace of mind for both users and pet managers while fostering deeper connections with animals.

## Live URL

[Live link](https://pet-care-server-eight.vercel.app/)

## Features

- **User Authentication**: Users can sign up, log in.
- **News Feed Management**: Only an admin and user will be able to create posts and also can update those.Everyone can see all the posts.
- **Payment Management**: An user can pay for premium posts allowing them to see all premium posts.

Technology Stack:

- Programming Language: TypeScript
- Web Framework: Express.js
- Database: MongoDB(Mongoose for ODM)
- Validation Library: Zod
- Authentication & Authorization : JSON Web Token
- Payment : aamarpay
- Deployment : Vercel

The api has the following endpoints:
API Endpoints:

- /api/auth
- /api/users
- /api/post
- /api/comment

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

## Clone the repository

**Follow this simple step to clone the project:**

```bash
git clone  https://github.com/GGTuran/pet-care-server
cd bike-rental-service-server
```

**Now install the dependencies of the project:**

```bash
npm install
```

## Set up the server

**Set up the environment variables in .env file**

```
PORT = 5000
DATABASE_URL=your_own_mongodb_uri
BCRYPT_SALT_ROUNDS= any number
JWT_ACCESS_SECRET= Your JWT Secret
JWT_ACCESS_EXPIRES= Your Jwt Token Expire time
STORE_ID = Your aamarpay store id
SIGNATURE_KEY = Your aamarpay signature key
PAYMENT_URL = aamarpay base url for payment
PAYMENT_VERIFY_URL = aamarpay base url for verifying transaction id
RESET_PASS_UI_LINK = http://localhost:3000
APP_PASS = your google app password
CLOUDINARY_CLOUD_NAME = your cloudinary cloud name
CLOUDINARY_API_KEY = your cloudinary api key
CLOUDINARY_API_SECRET = your cloudinary api secret
```

**You can compile typescript**

```
npm run build
```

## Start the server

**You can run the server in development mode**

```
npm run start:dev
```

**Or you can start the server by running the js files which is recommended**

```
npm run start:prod
```
