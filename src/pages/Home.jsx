import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ReactTyped } from "react-typed";

const images = [
"public/product4.jpg",
"public/product1.jpg",
"public/product2.jpg",
"public/product3.jpg",
"public/product5.jpg",
"public/beauty.jpg",
"public/download.jpg",
]


export default function Home() {
 
  const [loading, setLoading] = useState(true)
const [Categories, setCategories] = useState([])

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };



  useEffect(() => {
    axios.get("https://dummyjson.com/products/categories")
      .then(res => {
        setCategories(res.data)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])


  
    useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 py-10 pt-[100px] ">
           <h1 className="text-4xl font-bold text-center text-gray-800 mb-8"><ReactTyped strings={["Welcome to Our Store"]} typeSpeed={100}
           
         /></h1>
         <p className="text-center text-gray-600 mb-10"><ReactTyped strings={["Choose a category to explore our products"]} typeSpeed={60}
           backSpeed={50}
             loop={true}
         />
          </p>
   

         {loading ? (
          <div className="text-center text-gray-500">Loading categories...</div>
          ) : (
          <>
       <div className="flex justify-center items-center w-full max-w-5xl mx-auto">
  <Link to={'/'}>
    <button   className="border rounded-xl w-[200px] p-5 hover:shadow-lg hover:bg-gray-50 text-center text-gray-700 capitalize cursor-pointer transition-all">
      Shop Now
    </button>
 
  </Link>

</div>

                      
  
   
  
<div className="relative w-[400px] mt-8 h-[300px] max-w-xl mx-auto overflow-hidden rounded-2xl shadow-lg">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full object-cover transition-all duration-400"
      />
      <button
        onClick={prevSlide}
        className= "cursor-pointer absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full px-3 py-1 shadow"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="cursor-pointer absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full px-3 py-1 shadow"
      >
        ❯
      </button>
    </div>
        </>
        
        
      )}
    </div>
  )
}
