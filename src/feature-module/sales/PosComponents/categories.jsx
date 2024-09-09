/* eslint-disable react/prop-types */
import React from "react";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const Categories = ({ onCategoryClick }) => {
  const settings = {
    dots: false,
    autoplay: false,
    slidesToShow: 5,
    margin: 0,
    speed: 500,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const categoriesData = {
    categories: [
      {
        id: "all",
        name: "All Categories",
        imageSrc: "assets/img/categories/category-01.png",
        alt: "Categories",
        itemCount: 80,
      },
      {
        id: "headphones",
        name: "Headphones",
        imageSrc: "assets/img/categories/category-02.png",
        alt: "Categories",
        itemCount: 4,
      },
      {
        id: "shoes",
        name: "Shoes",
        imageSrc: "assets/img/categories/category-03.png",
        alt: "Categories",
        itemCount: 14,
      },
      {
        id: "mobiles",
        name: "Mobiles",
        imageSrc: "assets/img/categories/category-04.png",
        alt: "Categories",
        itemCount: 7,
      },
      {
        id: "watches",
        name: "Watches",
        imageSrc: "assets/img/categories/category-05.png",
        alt: "Categories",
        itemCount: 16,
      },
      {
        id: "laptops",
        name: "Laptops",
        imageSrc: "assets/img/categories/category-06.png",
        alt: "Categories",
        itemCount: 18,
      },
    ],
  };

  return (
    <div>
      <Slider {...settings} className="tabs owl-carousel pos-category">
        {categoriesData.categories.map((category) => (
          <div
            key={category.id}
            id={category.id}
            className="pos-slick-item"
            onClick={() => onCategoryClick(category.id)}
          >
            <Link to="#">
              <ImageWithBasePath src={category.imageSrc} alt={category.alt} />
            </Link>
            <h6>
              <Link to="#">{category.name}</Link>
            </h6>
            <span>{category.itemCount} Items</span>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Categories;
