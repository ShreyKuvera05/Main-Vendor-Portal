/* eslint-disable react/prop-types */
import React from "react";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { Check, PlusCircle } from "react-feather";
const Products = ({ selectedCategory, add2Cart }) => {
  const productData = {
    products: [
      {
        category: "Headphones",
        name: "Airpod 2",
        image: "assets/img/products/pos-product-05.png",
        quantity: 47,
        price: 5478,
        Pid: 1,
      },
      {
        category: "Headphones",
        name: "SWAGME",
        image: "assets/img/products/pos-product-08.png",
        quantity: 14,
        price: 6587,
        Pid: 2,
      },
      {
        category: "Shoes",
        name: "Red Nike Angelo",
        image: "assets/img/products/pos-product-04.png",
        quantity: 78,
        price: 7800,
        Pid: 3,
      },
      {
        category: "Shoes",
        name: "Blue White OGR",
        image: "assets/img/products/pos-product-06.png",
        quantity: 54,
        price: 987,
        Pid: 4,
      },
      {
        category: "Shoes",
        name: "Green Nike Fe",
        image: "assets/img/products/pos-product-18.png",
        quantity: 78,
        price: 7847,
        Pid: 5,
      },
      {
        category: "Mobiles",
        name: "IPhone 14 64GB",
        image: "assets/img/products/pos-product-01.png",
        quantity: 30,
        price: 15800,
        Pid: 6,
      },
      {
        category: "Mobiles",
        name: "Iphone 11",
        image: "assets/img/products/pos-product-14.png",
        quantity: 14,
        price: 3654,
        Pid: 7,
      },
      {
        category: "Watches",
        name: "Rolex Tribute V3",
        image: "assets/img/products/pos-product-03.png",
        quantity: 220,
        price: 6800,
        Pid: 8,
      },
      {
        category: "Watches",
        name: "Timex Black SIlver",
        image: "assets/img/products/pos-product-09.png",
        quantity: 24,
        price: 1457,
        Pid: 9,
      },
      {
        category: "Watches",
        name: "Fossil Pair Of 3 in 1",
        image: "assets/img/products/pos-product-11.png",
        quantity: 40,
        price: 789,
        Pid: 10,
      },
      {
        category: "laptops",
        name: "MacBook Pro",
        image: "assets/img/products/pos-product-02.png",
        quantity: 140,
        price: 1000,
        Pid: 11,
      },
      {
        category: "laptops",
        name: "IdeaPad Slim 5 Gen 7",
        image: "assets/img/products/pos-product-07.png",
        quantity: 74,
        price: 1454,
        Pid: 12,
      },
      {
        category: "laptops",
        name: "Tablet 1.02 inch",
        image: "assets/img/products/pos-product-10.png",
        quantity: 14,
        price: 4744,
        Pid: 13,
      },
      {
        category: "laptops",
        name: "Yoga Book 9i",
        image: "assets/img/products/pos-product-13.png",
        quantity: 65,
        price: 4784,
        Pid: 14,
      },
      {
        category: "laptops",
        name: "IdeaPad Slim 3i",
        image: "assets/img/products/pos-product-14.png",
        quantity: 47,
        price: 1245,
        Pid: 15,
      },
    ],
  };

  const filteredProducts =
    selectedCategory && selectedCategory.toLowerCase() !== "all"
      ? productData.products.filter(
          (product) =>
            product.category.toLowerCase() === selectedCategory.toLowerCase()
        )
      : productData.products;

  return (
    <>
      <div className="row">
        {filteredProducts.map((product, index) => (
          <div className="col-sm-2 col-md-6 col-lg-3 col-xl-3 pe-2" key={index}>
            <div className="product-info default-cover card">
              <Link to="#" className="img-bg">
                <ImageWithBasePath src={product.image} alt="Product" />
              </Link>
              <h6 className="cat-name">
                <Link to="#">{product.category}</Link>
              </h6>
              <h6 className="product-name">
                <>
                  <Link to="#">{product.name}</Link>
                </>
              </h6>
              <div className="d-flex align-items-center justify-content-between price">
                <span>{product.quantity} Pcs</span>
                <p>${product.price}</p>
                <PlusCircle
                  className="cart-hover"
                  onClick={() => add2Cart(product)}
                />
                {/* </p> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Products;
