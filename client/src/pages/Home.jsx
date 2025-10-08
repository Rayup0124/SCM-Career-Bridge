import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // If already logged in, redirect to dashboard
  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          SCM Career Bridge
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Connecting SCM Students with Industry Opportunities
        </p>
        <div className="flex gap-4 justify-center mb-6">
          <Link
            to="/register/student"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Student Portal
          </Link>
          <Link
            to="/register/company"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Company Portal
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Admin Portal
          </Link>
        </div>
        <div className="mt-8">
          <Link
            to="/login"
            className="text-gray-600 hover:text-gray-900 underline"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home

