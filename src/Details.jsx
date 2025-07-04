import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Details() {
  const { product_id } = useParams();
  const [detail, Setdetail] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const getdetails = () => {
    axios
      .get(`https://dummyjson.com/products/${product_id}`)
      .then((res) => {
        Setdetail(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useState(() => {
    getdetails();
  }, []);

  useEffect(() => {
    if (detail?.thumbnail) {
      setMainImage(detail.thumbnail);
    }
  }, [detail]);

  if (!detail) {
    return (
      <div className="text-center bg-white pt-[250px] pb-[250px] ">
        Loading...
      </div>
    );
  }

  return (
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased ">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 mt-[5%]">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img className="w-[350px] dark:hidden" src={mainImage} alt="" />
            <div className="w-[100px] h-[100px] flex ">
              {detail?.images?.map((img, i) => (
                <img
                  key={i}
                  className="cursor-pointer   object-cover"
                  src={img}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {detail.title}
            </h1>
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                ${detail.price}
              </p>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                  (Rating {detail.rating})
                </p>
              </div>
              <p>Discount % {detail.discountPercentage}</p>
            </div>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              {detail.description}
            </p>

            <div className="flex">
              <div>
                <p style={{ color: detail.stock > 5 ? "green" : "red" }}>
                  Available Stock - {detail.stock}
                </p>
                <p>Weight - {detail.weight} Gram</p>
                <p style={{ color: detail.returnPolicy > 1 ? "green" : "red" }}>
                  Return : {detail.returnPolicy}
                </p>
              </div>
              <div className="ms-[30px]">
                <p>Warrenty : {detail.warrantyInformation}</p>
                <p>Shipping : {detail.shippingInformation}</p>
              </div>
            </div>
            <div
              style={{ display: disabled ? "none" : "block" }}
              className="relative w-[200px] h-[150px] mt-[100px]"
            >
              {!disabled && <video src="/video.mp4" autoPlay={false}></video>}

              <button
                style={{ display: disabled ? "none" : "block" }}
                onClick={() => setDisabled(true)}
                className="absolute top-1 right-1 bg-white text-black rounded-full w-6 h-6 text-center font-bold shadow cursor-pointer"
                title="Disable video"
              >
                ✕
              </button>
            </div>
            {console.log(detail.reviews[0].comment)}
          </div>
        </div>
      </div>
    </section>
  );
}
