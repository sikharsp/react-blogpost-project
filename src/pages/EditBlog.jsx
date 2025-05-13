import { Field, Form, Formik } from "formik";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const EditBlogs = () => {
  const [image, setImage] = useState(null);
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values?.title);
    formData.append("content", values?.content);
    if (image) formData.append("image", image);
    formData.append("author", user?._id);

    try {
      await axios.put(`https://blog-hqx2.onrender.com/blog/${id}`, formData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Edit Your Blog</h2>
      <Formik
        initialValues={{
          title: location.state.blog.title,
          content: location.state.blog.content,
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        <Form className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-lg font-semibold mb-1">
              Title
            </label>
            <Field
              type="text"
              name="title"
              placeholder="Enter blog title"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-lg font-semibold mb-1">
              Content
            </label>
            <Field
              as="textarea"
              rows="5"
              name="content"
              placeholder="Enter blog content"
              className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-lg font-semibold mb-1">
              Upload Blog Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Submit Blog
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default EditBlogs;
