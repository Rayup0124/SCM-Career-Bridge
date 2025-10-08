# SCM Career Bridge - Setup Guide

This guide will help you set up the SCM Career Bridge platform on your local machine.

## 📋 Prerequisites Checklist

Before you begin, make sure you have:

- ✅ **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- ✅ **npm** (comes with Node.js)
- ✅ **Git** - [Download here](https://git-scm.com/)
- ✅ **MongoDB Atlas Account** (free) - [Sign up here](https://www.mongodb.com/cloud/atlas)
- ✅ **Code Editor** (VS Code recommended) - [Download here](https://code.visualstudio.com/)

## 🗄️ Step 1: MongoDB Atlas Setup

### 1.1 Create a Free Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Click **"Create"** to create a new cluster
4. Choose **"M0 Free"** tier
5. Select your preferred cloud provider and region (closest to you)
6. Name your cluster (e.g., "scm-career-bridge")
7. Click **"Create Cluster"**

### 1.2 Create Database User

1. In the left sidebar, click **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter a username (e.g., "scm-admin")
5. Click **"Autogenerate Secure Password"** or create your own
6. **⚠️ IMPORTANT**: Copy and save this password somewhere safe!
7. Set privileges to **"Atlas admin"** (for development)
8. Click **"Add User"**

### 1.3 Configure Network Access

1. In the left sidebar, click **"Network Access"**
2. Click **"Add IP Address"**
3. For development, click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ For production, restrict this to specific IP addresses
4. Click **"Confirm"**

### 1.4 Get Connection String

1. Go back to **"Database"** in the sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** as the driver
5. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **Save this connection string** - you'll need it in the next step!

## 🖥️ Step 2: Backend Setup

### 2.1 Install Dependencies

Open your terminal and navigate to the server folder:

```bash
cd server
npm install
```

This will install all required packages (Express, Mongoose, bcryptjs, etc.)

### 2.2 Configure Environment Variables

The `.env` file should already exist, but you need to update it:

1. Open `server/.env` in your code editor
2. Replace the `DATABASE_URL` line with your MongoDB Atlas connection string:

```env
DATABASE_URL=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/scm-career-bridge?retryWrites=true&w=majority
```

**Important replacements**:
- Replace `your-username` with the database username you created
- Replace `your-password` with the password you saved
- Replace `cluster0.xxxxx` with your actual cluster URL
- Keep `/scm-career-bridge` as the database name

Example:
```env
DATABASE_URL=mongodb+srv://scm-admin:MySecurePass123@cluster0.abc123.mongodb.net/scm-career-bridge?retryWrites=true&w=majority
```

3. The other environment variables are already set with defaults:
   - `JWT_SECRET`: Pre-configured (change for production)
   - `PORT`: 5000
   - `ADMIN_EMAIL`: admin@uts.edu.au
   - `ADMIN_PASSWORD`: admin123

### 2.3 Start the Backend Server

```bash
npm run dev
```

You should see:
```
🚀 Server running on port 5000
📍 Environment: development
🌐 API URL: http://localhost:5000
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
📊 Database Name: scm-career-bridge
```

✅ **Success!** Your backend is running!

Leave this terminal window open and running.

## 🎨 Step 3: Frontend Setup

### 3.1 Install Dependencies

Open a **NEW terminal window** and navigate to the client folder:

```bash
cd client
npm install
```

This will install React, Vite, Tailwind CSS, and other frontend dependencies.

### 3.2 Start the Frontend Development Server

```bash
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### 3.3 View the Application

Open your browser and go to:
```
http://localhost:3000
```

You should see the **SCM Career Bridge** landing page with three portal buttons!

✅ **Success!** Your frontend is running!

## ✅ Verification Checklist

Make sure everything is working:

- [ ] Backend terminal shows "MongoDB Connected"
- [ ] Backend is accessible at http://localhost:5000
- [ ] Frontend terminal shows Vite running
- [ ] Frontend is accessible at http://localhost:3000
- [ ] No error messages in either terminal

## 🧪 Test the Setup

### Test Backend API

Open your browser or use a tool like Postman to test:

1. **API Info**: http://localhost:5000
   - Should return JSON with API information

2. **Health Check**: http://localhost:5000/api/health
   - Should return `{"status": "OK", "database": "Connected"}`

### Test Frontend

1. Open http://localhost:3000
2. You should see a beautiful landing page with:
   - "SCM Career Bridge" title
   - Three portal buttons (Student, Company, Admin)

## 🎯 What's Next?

You've successfully completed **Phase 1**! 🎉

The project foundation is now ready:
- ✅ Frontend initialized with React + Vite + Tailwind
- ✅ Backend initialized with Express + MongoDB
- ✅ All database models created (User, Company, Internship, Application, Admin)
- ✅ Server running with CORS configured

**Next Steps (Phase 2)**:
- Implement user authentication (registration and login)
- Create protected routes
- Build company approval workflow
- See `requirements.md` for detailed next steps

## 🐛 Troubleshooting

### Backend won't start

**Error: "Error connecting to MongoDB"**
- Check your `DATABASE_URL` in `.env`
- Make sure you replaced `<username>` and `<password>`
- Verify your MongoDB Atlas network access allows your IP
- Check if your password contains special characters that need URL encoding

**Error: "Port 5000 already in use"**
- Change `PORT=5000` to another port in `.env` (e.g., `PORT=5001`)
- Update the proxy in `client/vite.config.js` to match

### Frontend won't start

**Error: "Module not found"**
- Run `npm install` again in the client folder
- Delete `node_modules` and `package-lock.json`, then run `npm install`

**Error: "Port 3000 already in use"**
- Vite will automatically try the next available port (3001, 3002, etc.)

### Can't connect to backend from frontend

- Make sure backend is running on port 5000
- Check the proxy configuration in `client/vite.config.js`
- Clear your browser cache

## 📞 Need Help?

If you encounter issues:

1. Check the error messages carefully
2. Verify all prerequisites are installed
3. Make sure MongoDB Atlas is properly configured
4. Ensure both terminals (frontend and backend) are running
5. Check the detailed README files in `client/` and `server/` folders

## 🎓 Learning Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Atlas Docs](https://www.mongodb.com/docs/atlas/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

---

**Happy coding! 🚀**

