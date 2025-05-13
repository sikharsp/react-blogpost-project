import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("https://blog-hqx2.onrender.com/blog");
      const data = await response.json();
      setBlogs(data.blogs || data);
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Discover Blog Posts
        </h1>

        {/* Link to create a new blog */}
        <Link to={"/myblog"}>  <div className="p-2 bg-blue-500 text-white rounded-lg">
        My Blog
       </div>
       </Link>
     <Link to={"/create-blog"}>  <div className="p-2 bg-blue-500 text-white rounded-lg">
        Create Blog
       </div>
       </Link>
      </div>

      {/* Display blogs */}
      {blogs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogs.map((blog) => (
            <Link to={`/singleblogs/${blog._id}`}
              key={blog._id}
              // onClick={() => navigate(`/singleAllBlogPage/${blog._id}`)}
              className="bg-white cursor-pointer rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl transform hover:-translate-y-1 flex flex-col"
            >
              {blog.image ? (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-52 object-cover"
                />
              ) : (
                <div className="w-full h-52 bg-gray-200 flex items-center justify-center text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
              <div className="p-5 flex flex-col flex-grow">
                <h2
                  className="text-xl font-semibold text-gray-800 mb-2 truncate hover:text-teal-600 transition duration-150"
                  title={blog.title}
                >
                  {blog.title}
                </h2>
                <div className="text-xs text-gray-500 mb-3 space-x-2">
                  <span>
                    By:{" "}
                    <span className="font-medium text-teal-700">
                      {blog.author?.name || "Unknown Author"}
                    </span>
                  </span>
                  <span>•</span>
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3 flex-grow">
                  {blog.content}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;