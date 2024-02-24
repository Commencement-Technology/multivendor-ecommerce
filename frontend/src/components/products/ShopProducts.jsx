import React from "react";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Ratings from "../Ratings";
import { FaArrowsSpin } from "react-icons/fa6";

const ShopProducts = ({ styles, products }) => {
  return (
    <div
      className={`w-full grid ${
        styles === "grid"
          ? "grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2"
          : "grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2"
      } gap-3`}
    >
      {products.map((p, i) => (
        <div
          key={i}
          className={`flex transition-all duration-1000 hover:shadow-md hover:-translate-y-3 ${
            styles === "grid"
              ? "flex-col justify-start items-start"
              : "justify-start items-center md-lg:flex-col md-lg:justify-start md-lg:items-start"
          } w-full gap-4 bg-white p-1 rounded-md`}
        >
          <div
            className={
              styles === "grid"
                ? "w-full relative group h-[210px] md:h-[270px] xs:h-[170px] overflow-hidden"
                : "md-lg:w-full relative group h-[210px] md:h-[270px] overflow-hidden"
            }
          >
            <img
              className="h-[240px] rounded-md md:h-[270px] xs:h-[170px] w-full object-cover"
              src={p.images[0]}
              alt="image"
            />
            <ul className="flex flex-col transition-all duration-500 justify-start items-start gap-2 ">
              <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded shadow hover:bg-orange-500 hover:text-white  absolute -left-10 top-6  group-hover:left-5  transition-all duration-300">
                <AiOutlineShoppingCart />
              </li>
              <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded shadow hover:bg-orange-500 hover:text-white absolute -left-10 top-[70px]  group-hover:left-5  transition-all duration-500">
                <AiFillHeart />
              </li>
              <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded shadow hover:bg-orange-500 hover:text-white  absolute -left-10 top-[116px] group-hover:left-5  transition-all duration-700">
                <FaArrowsSpin />
              </li>
              <Link
                to="/product/details/dsfdsf"
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded shadow hover:bg-orange-500 hover:text-white  absolute -left-10 top-[162px] group-hover:left-5  transition-all duration-1000"
              >
                <FaEye />
              </Link>
            </ul>
          </div>
          <div className="flex justify-start items-start flex-col gap-1">
            <h2 className="text-md text-slate-700 font-medium">{p.name}</h2>
            <div className="flex justify-start items-center gap-2">
              <span className="text-md  font-bold text-slate-700">${p.price}</span>
              <div className="flex text-lg">
                <Ratings ratings={p.rating} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopProducts;
