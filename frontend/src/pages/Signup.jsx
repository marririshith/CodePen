import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/api/signup', { email, username, password });
        login(res.data);
    };

    return (
        <form onSubmit={handleSubmit} className="p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Signup</h2>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="block mb-2 w-full p-2" />
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="block mb-2 w-full p-2" />
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="block mb-4 w-full p-2" />
            <button type="submit" className="bg-green-600 text-white px-4 py-2">Signup</button>
        </form>
    );
};

export default Signup;
