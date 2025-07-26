import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="flex justify-between p-4 bg-gray-800 text-white">
            <Link to='/' className="text-xl font-bold">CodePen Clone</Link>
            <div>
                {user ? (
                    <>
                        <span className="mr-4">Hello, {user.username}</span>
                        <Link to='/dashboard' className="mr-4">Dashboard</Link>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to='/login' className="mr-4">Login</Link>
                        <Link to='/signup'>Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
