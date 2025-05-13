import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);

  const fetchMyBlogs = async () => {
    try {
      const res = await axios.get(`https://blog-hqx2.onrender.com/blog/${user?._id}`);
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchMyBlogs();
    }
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 mt-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-10"> User Profile</h1>

      <div className="flex flex-col md:flex-row items-center md:items-start md:gap-10">
        <div className="flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center text-xs text-red-600 text-center border border-gray-300 shadow-sm">
             Outdated API Endpoint
          </div>
          <Link to="/profile/edit">
            <button className="mt-4 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md transition">
               Edit Profile
            </button>
          </Link>
        </div>

        <div className="flex-1 mt-8 md:mt-0 text-left space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
          <p className="text-gray-600 text-sm">{user?.email}</p>
          <p className="text-gray-500 italic text-sm">
            Member since: <span className="font-medium">Apr 2024</span>
          </p>

          <div className="mt-6 bg-emerald-50 p-5 rounded-md shadow-inner w-full md:w-72">
            <h3 className="text-gray-700 font-semibold text-lg">📝 Total Blogs Uploaded</h3>
            <p className="text-4xl font-bold text-emerald-600">{blogs.length}</p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4"> Your Blogs</h3>
        {blogs.length > 0 ? (
          <ul className="space-y-2 pl-4">
            {blogs.map((blog, index) => (
              <li key={index} className="text-blue-600 hover:text-blue-800 transition font-medium">
                <Link to={`/singleblogs/${blog._id}`} className="hover:underline">
                  {blog.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">You haven't uploaded any blogs yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
