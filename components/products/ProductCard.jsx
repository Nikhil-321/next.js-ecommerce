import Link from "next/link";
import React from "react";

const ProductCard = ({ item }) => {
  return (
    <div className="card flex flex-col items-center mb-16">
      <Link href={`/product/${item.slug}`} passHref>
        <img
          className="cursor-pointer"
          src={`${item.image}`}
          width={200}
          height={200}
        />
      </Link>
      <Link href={`/product/${item.slug}`} passHref>
        <h2 className="font-bold text-gray-500 mt-4 cursor-pointer">{item.name}</h2>
      </Link>
      <p className="text-sm text-gray-400">{item.brand}</p>
      <p className="text-sm text-primary font-bold">${item.price}</p>

      <button className="px-2 py-2 bg-primary rounded text-white outline-none mt-2 hover:bg-primary-dark">
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
