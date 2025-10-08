# SCM Career Bridge - Frontend Client

Frontend application for the SCM Career Bridge platform built with React, Vite, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
cd client
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will run on `http://localhost:3000`

## 📁 Project Structure

```
client/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components (to be added)
│   ├── pages/           # Page components
│   │   └── Home.jsx     # Landing page
│   ├── contexts/        # React contexts (to be added)
│   ├── hooks/           # Custom hooks (to be added)
│   ├── utils/           # Utility functions (to be added)
│   ├── App.jsx          # Main app component with routing
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles with Tailwind
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

## 🎨 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Tailwind Configuration

Custom theme colors are configured in `tailwind.config.js`:
- Primary color palette (blue shades)
- Responsive breakpoints
- Custom utilities

## 🔗 API Integration

The Vite config includes a proxy setup to forward `/api` requests to the backend server running on `http://localhost:5000`.

## 📊 Current Status

✅ Phase 1 Complete:
- Project initialization with Vite
- React Router setup
- Tailwind CSS configuration
- Basic landing page
- Proxy configuration for API calls

🔄 Next Steps (Phase 2):
- Create authentication pages (Login, Register)
- Implement protected routes
- Add authentication context
- Build user dashboards

## 🎯 Features

### Three User Portals

1. **Student Portal**
   - Browse internships
   - Apply for positions
   - Track applications
   - View skills demand dashboard

2. **Company Portal**
   - Post internships
   - Manage postings
   - Review applications
   - Track candidates

3. **Admin Portal**
   - Approve/reject companies
   - View analytics
   - Generate reports
   - Monitor platform activity

## 📄 License

MIT

