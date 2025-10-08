# SCM Career Bridge

A centralized internship platform designed specifically for UTS Faculty of Engineering and IT (SCM) students, local companies, and faculty administrators. The platform bridges the gap between students seeking internships, companies looking for talent, and administrators managing the ecosystem.

## 🎯 Project Goals

- **For Students**: Simplify the internship search process with targeted opportunities
- **For Companies**: Access a qualified talent pool from SCM programmes
- **For Administrators**: Gain insights through data analytics and streamline management

## 🏗️ Architecture

This is a full-stack MERN application:

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas
- **Authentication**: JWT-based auth with role-based access control

## 📂 Project Structure

```
SCM-Career-Bridge/
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── contexts/    # React contexts
│   │   └── App.jsx      # Main app component
│   └── package.json
├── server/              # Backend Express application
│   ├── config/          # Configuration files
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   └── server.js        # Main server file
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd SCM-Career-Bridge
```

2. **Setup Backend**
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB Atlas credentials
npm run dev
```

3. **Setup Frontend** (in a new terminal)
```bash
cd client
npm install
npm run dev
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### MongoDB Atlas Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (M0 Sandbox - Free)
3. Set up database access with username and password
4. Configure network access (add your IP or use 0.0.0.0/0 for development)
5. Get the connection string and update `DATABASE_URL` in `server/.env`

## 📋 Development Roadmap

### ✅ Phase 1: Foundation (COMPLETED)
- [x] Project initialization and setup
- [x] Database design and models
- [x] Basic server structure
- [x] Frontend skeleton

### 🔄 Phase 2: Authentication (In Progress)
- [ ] Student and company registration
- [ ] Unified login system
- [ ] JWT authentication
- [ ] Role-based access control
- [ ] Admin company approval workflow

### 📅 Phase 3: Core Features
- [ ] Company internship posting
- [ ] Student internship browsing and search
- [ ] Application system
- [ ] Application tracking

### 📅 Phase 4: Analytics
- [ ] Skills demand dashboard
- [ ] Admin analytics and reports
- [ ] Data visualization with Chart.js

### 📅 Phase 5: Deployment
- [ ] Backend deployment (Render)
- [ ] Frontend deployment (Vercel)
- [ ] End-to-end testing

## 🎓 Target SCM Programmes

The platform supports students from:
- Bachelor of Computing Science
- Bachelor of Arts in Industrial Design
- Bachelor of Arts (Hons.) in Creative Digital Media
- Bachelor of Mobile Game Development

## 🔐 User Roles

### Student
- Browse and search internships
- Apply for positions
- Track application status
- View skills demand insights
- Manage profile and resume

### Company
- Register and await approval
- Post internship opportunities
- Specify target programmes
- Review student applications
- Manage postings

### Administrator
- Approve/reject company registrations
- View platform analytics
- Generate reports
- Monitor system health

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router v6** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Chart.js** - Data visualization

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📝 API Documentation

### Authentication
- `POST /api/auth/register/student` - Register student
- `POST /api/auth/register/company` - Register company
- `POST /api/auth/login` - Login (all roles)

### Internships
- `GET /api/internships` - List internships
- `POST /api/internships` - Create internship (company)
- `GET /api/internships/:id` - Get internship details
- `PUT /api/internships/:id` - Update internship (company)

### Applications
- `POST /api/applications` - Apply for internship
- `GET /api/applications/student` - Get student's applications
- `GET /api/applications/company/:internshipId` - Get applications for internship

### Admin
- `GET /api/admin/companies/pending` - List pending companies
- `PUT /api/admin/companies/approve/:id` - Approve company
- `GET /api/admin/stats` - Get platform statistics

## 🤝 Contributing

This project follows a structured development approach with phase-based implementation. See `PHASE1_SUMMARY.md` for completed features and development progress.

## 📄 License

MIT

## 👥 Contact

For questions or support, please contact the development team.

---

**Note**: This project is currently in active development. Features are being implemented in phases as outlined in the development roadmap.
