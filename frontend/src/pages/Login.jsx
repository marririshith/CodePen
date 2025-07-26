import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/api/login', { email, password });
        login(res.data);
    };

    return (
        <form onSubmit={handleSubmit} className="p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="block mb-2 w-full p-2" />
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="block mb-4 w-full p-2" />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2">Login</button>
        </form>
    );
};

export default Login;