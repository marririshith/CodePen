import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Editor = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [js, setJs] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/api/projects/${id}`, {
            headers: { Authorization: `Bearer ${user?.token}` },
        }).then(res => {
            setHtml(res.data.html || '');
            setCss(res.data.css || '');
            setJs(res.data.js || '');
        });
    }, [id]);

    const handleSave = async () => {
        await axios.put(`http://localhost:5000/api/projects/${id}`, {
            html, css, js
        }, {
            headers: { Authorization: `Bearer ${user?.token}` },
        });
        alert('Saved!');
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div>
                <h3 className="text-lg font-semibold">HTML</h3>
                <textarea className="w-full h-40 p-2 border" value={html} onChange={(e) => setHtml(e.target.value)} />

                <h3 className="text-lg font-semibold mt-4">CSS</h3>
                <textarea className="w-full h-40 p-2 border" value={css} onChange={(e) => setCss(e.target.value)} />

                <h3 className="text-lg font-semibold mt-4">JS</h3>
                <textarea className="w-full h-40 p-2 border" value={js} onChange={(e) => setJs(e.target.value)} />

                <button onClick={handleSave} className="mt-4 bg-green-600 text-white px-4 py-2">Save</button>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
                <iframe
                    className="w-full h-[480px] border"
                    title="Live Preview"
                    sandbox="allow-scripts"
                    srcDoc={`<html><style>${css}</style><body>${html}</body><script>${js}</script></html>`}
                />
            </div>
        </div>
    );
};

export default Editor;
