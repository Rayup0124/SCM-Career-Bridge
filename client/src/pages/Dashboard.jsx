import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, role, logout, isStudent, isCompany, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">SCM Career Bridge</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user?.name || user?.companyName}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome, {user?.name || user?.companyName}!
            </h2>
            
            <div className="mb-6">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                isStudent ? 'bg-blue-100 text-blue-800' :
                isCompany ? 'bg-green-100 text-green-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {role?.toUpperCase()}
              </span>
            </div>

            {isStudent && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Student Dashboard</h3>
                <p className="text-gray-600 mb-4">
                  Student ID: {user?.studentId}
                </p>
                <p className="text-gray-600 mb-4">
                  Programme: {user?.programme}
                </p>
                <div className="space-y-2">
                  <button className="block w-full text-left px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded">
                    Browse Internships
                  </button>
                  <button className="block w-full text-left px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded">
                    My Applications
                  </button>
                  <button className="block w-full text-left px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded">
                    Skills Dashboard
                  </button>
                </div>
              </div>
            )}

            {isCompany && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Company Dashboard</h3>
                <div className="mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    user?.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    user?.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    Status: {user?.status}
                  </span>
                </div>
                
                {user?.status === 'Pending' && (
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded mb-4">
                    <p className="text-yellow-800">
                      Your company account is pending admin approval. You will be able to post internships once approved.
                    </p>
                  </div>
                )}

                {user?.status === 'Approved' && (
                  <div className="space-y-2">
                    <button className="block w-full text-left px-4 py-2 bg-green-50 hover:bg-green-100 rounded">
                      Post New Internship
                    </button>
                    <button className="block w-full text-left px-4 py-2 bg-green-50 hover:bg-green-100 rounded">
                      My Internships
                    </button>
                    <button className="block w-full text-left px-4 py-2 bg-green-50 hover:bg-green-100 rounded">
                      View Applications
                    </button>
                  </div>
                )}
              </div>
            )}

            {isAdmin && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Admin Dashboard</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => navigate('/admin/companies')}
                    className="block w-full text-left px-4 py-2 bg-purple-50 hover:bg-purple-100 rounded"
                  >
                    Approve Companies
                  </button>
                  <button className="block w-full text-left px-4 py-2 bg-purple-50 hover:bg-purple-100 rounded">
                    View Analytics
                  </button>
                  <button className="block w-full text-left px-4 py-2 bg-purple-50 hover:bg-purple-100 rounded">
                    Generate Reports
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

