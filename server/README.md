# SCM Career Bridge - Backend Server

Backend API server for the SCM Career Bridge platform built with Node.js, Express, and MongoDB.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- npm or yarn

### Installation

1. Install dependencies:
```bash
cd server
npm install
```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the following variables in `.env`:
     - `DATABASE_URL`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: A secure random string for JWT signing
     - `ADMIN_EMAIL` and `ADMIN_PASSWORD`: Default admin credentials

3. Start the server:
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## 📁 Project Structure

```
server/
├── config/
│   └── database.js      # MongoDB connection configuration
├── models/
│   ├── User.js          # Student user model
│   ├── Company.js       # Company model
│   ├── Internship.js    # Internship posting model
│   ├── Application.js   # Application model
│   ├── Admin.js         # Admin model
│   └── index.js         # Model exports
├── routes/              # API routes (to be added in Phase 2)
├── middleware/          # Custom middleware (to be added in Phase 2)
├── controllers/         # Route controllers (to be added in Phase 2)
├── utils/               # Utility functions (to be added in Phase 2)
├── .env                 # Environment variables (DO NOT COMMIT)
├── .env.example         # Environment variables template
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies and scripts
├── server.js            # Main server file
└── README.md            # This file
```

## 🗄️ Database Models

### User (Student)
- Student information including name, email, student ID, programme
- Skills array and resume URL
- Password authentication

### Company
- Company profile with name, HR email, description, website
- Approval status (Pending/Approved/Rejected)
- Password authentication

### Internship
- Internship postings with title, description, required skills
- Target programmes and company reference
- Status (Open/Closed) and application tracking

### Application
- Links students to internships
- Application status tracking (Applied, Under Review, Interviewing, Offered, Rejected)
- Cover letter and resume
- Status history for tracking changes

### Admin
- Admin user for platform management
- Permissions system
- Company approval capabilities

## 🔧 API Endpoints

### Health Check
- `GET /` - API information
- `GET /api/health` - Health check endpoint

### Authentication (Phase 2)
- `POST /api/auth/register/student` - Student registration
- `POST /api/auth/register/company` - Company registration
- `POST /api/auth/login` - Login for all user types

### More endpoints will be added in subsequent phases...

## 🔐 Environment Variables

Required environment variables:

- `DATABASE_URL` - MongoDB Atlas connection string
- `JWT_SECRET` - Secret key for JWT token generation
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `ADMIN_EMAIL` - Default admin email
- `ADMIN_PASSWORD` - Default admin password

## 📝 MongoDB Atlas Setup

1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (M0 Sandbox - Free tier)
3. Set up database access:
   - Create a database user with username and password
   - Note down the credentials
4. Set up network access:
   - Add your IP address OR
   - Allow access from anywhere (0.0.0.0/0) for development
5. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<username>`, `<password>`, and database name

## 🛠️ Development

The server uses:
- **Express.js** for the web framework
- **Mongoose** for MongoDB object modeling
- **bcryptjs** for password hashing
- **jsonwebtoken** for JWT authentication
- **cors** for Cross-Origin Resource Sharing
- **dotenv** for environment variable management

## 📊 Current Status

✅ Phase 1 Complete:
- Project initialization
- MongoDB connection setup
- All data models created (User, Company, Internship, Application, Admin)
- Basic server structure with CORS

🔄 Next Steps (Phase 2):
- Implement authentication routes
- Add JWT middleware
- Create company approval system

## 📄 License

MIT

