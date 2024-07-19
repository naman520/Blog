import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { get, put } from '../Service/ApiAuthEndpoints.js'


export default function UpdateBlog() {
    const [blog, setBlog] = useState({title: '', content :''})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if(id){
            fetchBlog()
        }
    }, [id])

    const fetchBlog = async() =>{
        try {
            const response = await get(`/blog/updateBlog/${id}`)
            setBlog(response.data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching blog:', error);
            setError('Failed to fetch blog. Please try again.');
            setLoading(false);
        }
    }

    const handleInputChange = (e) => {
        const {name , value} = e.target
        setBlog(prevBlog => ({
            ...prevBlog,
            [name] :value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await put(`/blog/updateBlog/${id}`,blog)
            navigate('/');
        } catch (error) {
            console.error('Error updating blog:', error);
            setError('Failed to update blog. Please try again.');
        }
    }

  return (
    <>
        <div>
        <h2>Update Blog</h2>
            <form onSubmit={handleSubmit} className=' p-28 text-center '>
                <div >
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={blog.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={blog.content}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Update Blog</button>
            </form>
        </div>
    </>
  )
}
