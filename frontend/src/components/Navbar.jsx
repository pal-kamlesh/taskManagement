import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, LogIn, UserPlus } from "lucide-react";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link
            to="/"
            className="flex items-center space-x-2 text-white text-xl md:text-2xl font-bold transition-all duration-300 transform hover:scale-105"
          >
            <span className="text-2xl md:text-3xl">🎯</span>
            <span className="font-bold">Mission Control</span>
          </Link>

          <ul className="flex items-center space-x-1 md:space-x-4">
            {isAuthenticated ? (
              <>
                {/* <li>
                  <Link 
                    to="/add" 
                    className="flex items-center px-3 py-2 md:px-4 md:py-2 rounded-full bg-yellow-400 hover:bg-yellow-300 text-indigo-800 font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    <PlusCircle className="mr-1 h-4 w-4 md:h-5 md:w-5" />
                    <span className="hidden md:inline">New Mission</span>
                  </Link>
                </li> */}
                <li>
                  <button
                    onClick={logout}
                    className="flex items-center px-3 py-2 md:px-4 md:py-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    <LogOut className="mr-1 h-4 w-4 md:h-5 md:w-5" />
                    <span className="hidden md:inline">Logout</span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="flex items-center px-3 py-2 md:px-4 md:py-2 rounded-full bg-green-400 hover:bg-green-300 text-green-800 font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    <LogIn className="mr-1 h-4 w-4 md:h-5 md:w-5" />
                    <span className="hidden md:inline">Login</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="flex items-center px-3 py-2 md:px-4 md:py-2 rounded-full bg-pink-400 hover:bg-pink-300 text-pink-800 font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    <UserPlus className="mr-1 h-4 w-4 md:h-5 md:w-5" />
                    <span className="hidden md:inline">Register</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
