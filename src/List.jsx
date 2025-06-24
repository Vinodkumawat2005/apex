import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { Maincontext } from "./Componenet/Context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // ✅ Important

export default function List() {
  const [product, Setproduct] = useState([]);
  const [categories, Setcategories] = useState([]);
  const { category_slug } = useParams();
  const [loading, Setloading] = useState(true);
  const [totalpage, Settotalpage] = useState(0);
  const [currentpage, Setcurrentpage] = useState(0);
  const { addtocart } = useContext(Maincontext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const limit = 10;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const search = queryParams.get("search");
  const searchType = queryParams.get("type") || "product";
  const page = queryParams.get("page") || 1;


  const notify = () => {
    toast.success("Added to cart!" )}; 

  const getcategory = () => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => {
        Setcategories(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    const matchedCategory = categories.find((cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (matchedCategory) {
      navigate(`/product?search=${matchedCategory.slug}&type=category`);
    } else {
      alert("Category not found!");
    }
  };

  useEffect(() => {
    getcategory();
  }, []);

  useEffect(() => {
    let API;
    const skip = (page - 1) * limit;
    if (search) {
      if (searchType === "category") {
        API = `https://dummyjson.com/products/category/${search}?skip=${skip}&limit=${limit}`;
      } else {
        API = `https://dummyjson.com/products/search?q=${search}&skip=${skip}&limit=${limit}`;
      }
    } else {
      API = `https://dummyjson.com/products?skip=${skip}&limit=${limit}`;
    }

    Setloading(true);
    axios
      .get(API)
      .then((res) => {
        Setproduct(res.data.products);
        Settotalpage(Math.ceil(res.data.total / limit));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        Setloading(false);
      });
  }, [search, searchType, page]);

  let paginaction = [];
  for (let i = 0; i < totalpage; i++) {
    paginaction.push(
      <li key={i} className="iteam-center justify-center w-[100%]">
        <Link
          to={
            search
              ? `/product?search=${search}&type=${searchType}&page=${i + 1}`
              : `/product?page=${i + 1}`
          }
        >
          <div className="p-1 w-[20.5px] text-amber-500 leading-tight m-auto bg-white border hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700">
            {i + 1}
          </div>
        </Link>
      </li>
    );
  }

  return (
    <>
      <ToastContainer  autoClose={3000}  closeOnClick  /> 
{/* <button className="mt-[100px]" onClick={notify}>Show Toast</button> */}
      <div className="grid grid-cols-6 bg-[white] md:grid-cols-5">
        <div className="mt-[78px] md:col-span-1 ms-[30px] col-span-2 xl:col-span-1">
          <h2 className=" text-2xl font-bold tracking-tight text-gray-900 mt-3.5 ms-[15px]">
            Category
          </h2>

          <Link to={"/product"}>
            <button className="mt-3.5 m-1.5 bg-gray-300 border-b-black w-[90%] md:w-[150px] h-[40px] cursor-pointer">
              All
            </button>
          </Link>

          {categories.map((cate, index) => (
            <Link key={index} to={`/product?search=${cate.slug}&type=category`}>
              <button
                className={`${
                  search === cate.slug && searchType === "category"
                    ? "bg-amber-800 text-white"
                    : "bg-gray-300"
                } mt-3.5 m-1.5 w-[90%] md:w-[160px] h-[45px] cursor-pointer items-center`}
              >
                {cate.name}
              </button>
            </Link>
          ))}
        </div>

        <div className="col-span-2 flex flex-wrap items-start ms-[30px] h-[100%]  me-[15px] mt-[116px] gap-3 md:col-span-4  md:ms-3.5 ">
          {loading
            ? [1, 2, 3, 4, 5, 6].map((d, i) => (
                <div
                  key={i}
                  className="w-[300px] h-[400px] bg-gray-200 animate-pulse "
                ></div>
              ))
            : product.map((item, index) => (
                <div
                  key={index}
                  className="
                    group   md:mt-[20px]   md:ms-[50px]   cursor-pointer w-[230px] h-[430px]  relative col-span-2  mt-2"
                >
                  <Link to={`/details/${item.id}`}>
                    <img
                      className="aspect-square w-full h-[200px] rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                      src={item.thumbnail}
                      alt={item.title}
                    />
                  </Link>
                  <div className="mt-4  flex justify-between ">
                    <div className="ms-1">
                      <h3 className="text-sm text-gray-700">{item.title}</h3>
                      <p className="mt-1 text-sm text-gray-800">
                        {item.category}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${item.price}
                    </p>
                  </div>

                  <div className="mt-4 flex space-x-2 justify-center">
                    <Link
                      to={`/details/${item.id}`}
                      className="focus:outline-none text-white bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                    >
                      View
                    </Link>
                    <button
                      type='button'
                      onClick={() => {
                        addtocart(item.id);
                        notify(); 
                      }}
                      className="focus:outline-none text-white cursor-pointer xl:bg-amber-500 bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="h-[50px] pt-34  bg-[white] flex   justify-center items-center ">
        <nav aria-label="Page navigation" className="block">
          <ul className="inline-flex -space-x-px text-sm cursor-pointer">
            {paginaction}
          </ul>
        </nav>
      </div>
      <div className="w-[100%] h-[70px] bg-white"></div>
    </>
  );
}
