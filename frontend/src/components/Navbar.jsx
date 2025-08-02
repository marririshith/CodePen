import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="fixed top-4 left-4 right-4 z-50 glass-card px-6 py-4 mx-auto max-w-6xl animate-slide-up">
            <div className="flex justify-between items-center">
                <Link 
                    to='/' 
                    className="text-2xl font-bold text-white hover:text-neutral-200 transition-all duration-300"
                >
                    &lt;CodeLab/&gt;
                </Link>
                <div className="flex items-center space-x-6">
                    {user ? (
                        <>
                            <div className="flex items-center space-x-1 text-green-500">
                                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium">{user.username}</span>
                            </div>
                            
                            <Link 
                                to='/dashboard' 
                                className="nav-link font-medium"
                            >
                                Dashboard
                            </Link>
                            
                            <button 
                                onClick={logout}
                                className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 text-red-300 hover:text-red-200 px-4 py-2 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link 
                                to='/login' 
                                className="nav-link font-medium"
                            >
                                Login
                            </Link>
                            
                            <Link 
                                to='/signup' 
                                className="btn-primary"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
