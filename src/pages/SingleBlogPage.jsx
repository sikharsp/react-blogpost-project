import axios from 'axios';
import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const SingleBlogPage = () => {
    const [singleBlog,setSingleBlog] = useState();
    const {id} = useParams();

     const fetchData = async()=>{
        const response = await axios.get(`https://blog-hqx2.onrender.com/blog/single/${id}`)
         setSingleBlog(response.data);
     }

     useEffect(()=>{
       fetchData();
     },[])
  return (
   <div class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
   <h1 class="text-3xl font-semibold text-gray-800 mb-4">{singleBlog?.title}</h1>
   <img class="w-full h-auto rounded-lg mb-6" src={singleBlog?.image} alt="Blog Image" />
   <p class="text-lg text-gray-700 leading-relaxed">{singleBlog?.content}</p>
</div>

  )
}

export default SingleBlogPage

