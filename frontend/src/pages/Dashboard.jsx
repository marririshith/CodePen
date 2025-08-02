import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [newProjectName, setNewProjectName] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/api/projects', {
            headers: { Authorization: `Bearer ${user?.token}` },
        }).then(res => setProjects(res.data));
    }, []);

    const handleCreate = async () => {
        if (!newProjectName.trim()) return;
        
        setIsCreating(true);
        try {
            const res = await axios.post('http://localhost:8080/api/projects', {
                name: newProjectName,
            }, {
                headers: { Authorization: `Bearer ${user?.token}` },
            });
            navigate(`/editor/${res.data._id}`);
        } catch (error) {
            console.error('Failed to create project:', error);
        } finally {
            setIsCreating(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen pt-24 px-4 pb-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        Your Projects
                    </h1>
                    <p className="text-neutral-400 text-lg">
                        Create, edit, and manage your code projects
                    </p>
                </motion.div>

                <motion.div
                    className="glass-card p-6 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <h3 className="text-xl font-semibold mb-4 text-white">Create New Project</h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            value={newProjectName}
                            onChange={e => setNewProjectName(e.target.value)}
                            placeholder="Enter project name..."
                            className="input-futuristic flex-1"
                            onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
                        />
                        <motion.button
                            onClick={handleCreate}
                            disabled={!newProjectName.trim() || isCreating}
                            className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                            whileTap={{ scale: 0.98 }}
                        >
                            {isCreating ? (
                                <div className="flex items-center">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                    Creating...
                                </div>
                            ) : (
                                <span className="flex items-center">
                                    <span>Create Project</span>
                                    <span className="ml-2">+</span>
                                </span>
                            )}
                        </motion.button>
                    </div>
                </motion.div>

                {projects.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={project._id}
                                className="card-futuristic group cursor-pointer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => navigate(`/editor/${project._id}`)}
                            >
                                <div className="w-12 h-12 bg-neutral-700 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-white text-xl font-bold">
                                        {project.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>

                                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-neutral-200 transition-colors duration-300">
                                    {project.name}
                                </h3>
                                
                                <div className="text-neutral-500 text-sm mb-4">
                                    {project.updatedAt ? (
                                        <span>Updated {formatDate(project.updatedAt)}</span>
                                    ) : (
                                        <span>New project</span>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {['HTML', 'CSS', 'JS'].map((tech) => (
                                        <span 
                                            key={tech}
                                            className="px-2 py-1 bg-white/10 text-xs rounded-md text-gray-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-gray-500 text-sm">Click to edit</span>
                                    <div className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300">
                                        →
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        className="text-center py-20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                                                <div className="w-24 h-24 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-4xl opacity-60">📝</span>
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-4">No projects yet</h3>
                        <p className="text-neutral-400 mb-8 max-w-md mx-auto">
                            Create your first project to start building amazing things with HTML, CSS, and JavaScript.
                        </p>
                        <button
                            onClick={() => document.querySelector('input').focus()}
                            className="btn-primary"
                        >
                            Create Your First Project
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;