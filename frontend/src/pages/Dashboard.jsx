import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [newProjectName, setNewProjectName] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/projects', {
            headers: { Authorization: `Bearer ${user?.token}` },
        }).then(res => setProjects(res.data));
    }, []);

    const handleCreate = async () => {
        const res = await axios.post('http://localhost:5000/api/projects', {
            name: newProjectName,
        }, {
            headers: { Authorization: `Bearer ${user?.token}` },
        });
        navigate(`/editor/${res.data._id}`);
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Your Projects</h2>
            <input value={newProjectName} onChange={e => setNewProjectName(e.target.value)} placeholder="New project name" className="p-2 border w-full mb-4" />
            <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 mb-4">Create Project</button>
            <ul>
                {projects.map(p => (
                    <li key={p._id} className="border p-2 mb-2">
                        <span className="font-medium">{p.name}</span>
                        <button onClick={() => navigate(`/editor/${p._id}`)} className="ml-4 text-blue-500">Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;