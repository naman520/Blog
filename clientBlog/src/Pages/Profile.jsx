import React, { useState, useEffect } from 'react';
import { get } from '../Service/ApiAuthEndpoints';
import { useNavigate } from 'react-router-dom';

function MyBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserBlogs();
    }, []);

    const fetchUserBlogs = async () => {
        try {
            const response = await get('/blog/auth/profile');
            setBlogs(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user blogs:', error);
            setError('Failed to fetch blogs. Please try again.');
            setLoading(false);
            if (error.response && error.response.status === 401) {
                // User is not authenticated
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('username');
                navigate('/');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2 className=' pt-44 text-center font-semibold text-3xl'>Your Blogs</h2>
            {blogs.length === 0 ? (
                <p className=' text-center p-20'>You haven't published any blogs yet.</p>
            ) : (
              <ul className="container mx-auto p-4 shadow-xl shadow-teal-700 mt-8 rounded-lg bg-white">
              {blogs.map(blog => (
                <li key={blog._id} className="mb-6 p-4 border-b last:border-none border-gray-200">
                  <h3 className="text-xl font-bold mb-2 text-teal-700">{blog.title}</h3>
                  <p className="text-gray-700">{blog.content.substring(0, 100)}...</p>
                </li>
              ))}
            </ul>
            
            )}
        </div>
    );
}

export default MyBlogs;