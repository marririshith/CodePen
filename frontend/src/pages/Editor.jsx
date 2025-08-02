import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Editor = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [js, setJs] = useState('');
    const [activeTab, setActiveTab] = useState('html');
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);
    const [projectName, setProjectName] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/projects/${id}`, {
            headers: { Authorization: `Bearer ${user?.token}` },
        }).then(res => {
            setHtml(res.data.html || '');
            setCss(res.data.css || '');
            setJs(res.data.js || '');
            setProjectName(res.data.name || 'Untitled Project');
        });
    }, [id]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await axios.put(`http://localhost:8080/api/projects/${id}`, {
                html, css, js
            }, {
                headers: { Authorization: `Bearer ${user?.token}` },
            });
            setLastSaved(new Date());
        } catch (error) {
            console.error('Save failed:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const tabs = [
        { id: 'html', label: 'HTML', value: html, setter: setHtml, icon: '🏗️' },
        { id: 'css', label: 'CSS', value: css, setter: setCss, icon: '🎨' },
        { id: 'js', label: 'JavaScript', value: js, setter: setJs, icon: '⚡' }
    ];

    const srcDoc = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <script>${js}</script>
        </body>
        </html>
    `;

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                handleSave();
            }
        };
    
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [html, css, js]); 

    return (
        <div className="min-h-screen pt-20 flex flex-col mt-6">
            <div className="glass-card mx-4 mb-4 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="text-neutral-400 hover:text-white transition-colors duration-300"
                        >
                            ← Back to Dashboard
                        </button>
                        <div className="w-px h-6 bg-neutral-600"></div>
                        <h1 className="text-xl font-semibold text-white">{projectName}</h1>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        {lastSaved && (
                            <span className="text-sm text-neutral-400">
                                Saved {lastSaved.toLocaleTimeString()}
                            </span>
                        )}
                        <motion.button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                            whileTap={{ scale: 0.98 }}
                        >
                            {isSaving ? (
                                <div className="flex items-center">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                    Saving...
                                </div>
                            ) : (
                                'Save Project'
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex mx-4 mb-4 gap-4">
                    <div className="w-1/2 glass-card overflow-hidden">
                    <div className="flex bg-neutral-900/50 border-b border-white/10">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-300 ${
                                    activeTab === tab.id
                                        ? 'text-white bg-white/10 border-b-2 border-white'
                                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <div className="h-full">
                        {tabs.map((tab) => (
                            <div
                                key={tab.id}
                                className={`${activeTab === tab.id ? 'block' : 'hidden'} h-full`}
                            >
                                <textarea
                                    value={tab.value}
                                    onChange={(e) => tab.setter(e.target.value)}
                                    className="w-full h-full resize-none bg-transparent text-white font-mono p-4 focus:outline-none"
                                    placeholder={`Enter your ${tab.label.toLowerCase()} code here...`}
                                    style={{
                                        minHeight: 'calc(100vh - 200px)',
                                        fontFamily: 'JetBrains Mono, Fira Code, Consolas, monospace',
                                        fontSize: '14px',
                                        lineHeight: '1.5',
                                        tabSize: 2
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-1/2 glass-card overflow-hidden">
                    <div className="bg-neutral-900/50 border-b border-white/10 px-4 py-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <span className="text-white font-medium">Live Preview</span>
                                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-pulse"></div>
                            </div>
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                    
                    <iframe
                        className="w-full bg-white"
                        title="Live Preview"
                        sandbox="allow-scripts allow-forms allow-popups allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-same-origin"
                        srcDoc={srcDoc}
                        style={{
                            height: 'calc(100vh - 200px)',
                            border: 'none'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Editor;
