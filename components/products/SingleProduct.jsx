import Image from "next/image";
import React, { useContext, useEffect } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";

const SingleProduct = ({ item, product }) => {
  const { state, dispatch } = useContext(ShoppingCartContext);

  const isProductExists = () => {
    const productExists = state.cart.cartItems.find(e => e.slug === product)
    return productExists
  }



  const addItemToCart = () => {
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity: 1 } });
  };

  const incrementProduct = () => {
   const existingProduct = isProductExists()
   existingProduct.quantity = existingProduct.quantity + 1
   console.log(existingProduct)
   dispatch({type: "CART_ADD_ITEM", payload: {...existingProduct}})
  }

  const decrementProduct = () => {
    const existingProduct = isProductExists()
    existingProduct.quantity = existingProduct.quantity - 1
    console.log(existingProduct)
    dispatch({type: "CART_ADD_ITEM", payload: {...existingProduct}})

  }

  return (
    <>
      <div className="flex items-center mt-24">
        <Image src={item.image} width={400} height={400} />
        <div className="ml-12">
          <h2 className="font-bold text-lg text-gray-500">Product Details</h2>
          <p className="text-sm text-gray-400">
            {" "}
            <span className="font-bold text-gray-500">Name: </span>
            {item.name}
          </p>
          <p className="text-sm text-gray-400">
            {" "}
            <span className="font-bold text-gray-500">Brand: </span>
            {item.brand}
          </p>
          <p className="text-sm text-gray-400">
            {" "}
            <span className="font-bold text-gray-500">Description: </span>
            {item.description}
          </p>

          <p className="text-sm text-gray-400">
            <span className="font-bold text-gray-500">Rating:</span>
            {item.rating} of {item.numReviews} reviews
          </p>
        </div>
      </div>
      <div className="card mt-12 mb-12 px-8 py-8 w-1/2">
        <p className=" text-gray-400 py-2">
          <span className="font-bold text-gray-500">Price:</span> ${item.price}
        </p>
        <p className=" text-gray-400 py-2">
          <span className="font-bold text-gray-500">Status:</span>{" "}
          {item.countInStock > 0 ? "In-Stock" : "Out of Stock"}
        </p>
        {isProductExists()?.quantity > 0 && (
          <button onClick={decrementProduct} className=" bg-primary text-white py-2 px-2 rounded mt-4 hover:bg-primary-dark mx-2 outline-none">
            -
          </button>
        )}
        {!isProductExists() && (
          <button
            onClick={addItemToCart}
            className=" bg-primary text-white py-2 px-2 rounded mt-4 hover:bg-primary-dark outline-none"
          >
            Add to cart
          </button>
        )}

        {isProductExists() && (
          <button className=" bg-primary text-white py-2 px-2 rounded mt-4 hover:bg-primary-dark">
           {isProductExists()?.quantity}
          </button>
        )}

        {isProductExists()?.quantity >= 1 && (
          <button onClick={incrementProduct} className=" bg-primary text-white py-2 px-2 rounded mt-4 hover:bg-primary-dark mx-2 outline-none">
            +
          </button>
        )}
      </div>
    </>
  );
};

export default SingleProduct;
