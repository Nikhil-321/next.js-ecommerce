import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import {faTrash } from "@fortawesome/free-solid-svg-icons";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import Image from "next/image";
import { useRouter } from "next/router";

const CartPage = () => {
  const { state, dispatch } = useContext(ShoppingCartContext);
  const router = useRouter()

  const navigateToShipping = () => {
    router.push("/shipping")
  }
  // Total Amount 
  const totalAmount = state?.cart.cartItems?.reduce((acc, e) => {
    acc = acc + e.quantity * e.price;
    return acc;
  }, 0);

  // Total Quantity
  const totalQuantity = state?.cart?.cartItems.reduce((acc, e) => {
    acc = acc + e.quantity;
    return acc;
  }, 0);


  // Remove item from cart
  const removeItemFromCart = (id) => {
    dispatch({type: "REMOVE_CART_ITEM", payload: id})
    
  }

  // Update Cart Quantity
  const updateCartQuantity = (item, quantity) => {
    console.log("updated", item, quantity)
    dispatch({type: "UPDATE_QUANTITY", payload: {...item, quantity}})
  }
  return (
    <>
      <table
        width={800}
        className="table-auto border-separate border-spacing-2 border border-slate-400 m-auto mt-24 px-8 py-8"
      >
        <thead>
          <tr>
            <th className="border border-slate-300 bg-gray-100 px-4">Item</th>
            <th className="border border-slate-300 bg-gray-100 px-4">
              Quantity
            </th>
            <th className="border border-slate-300 bg-gray-100 px-4">Price</th>
            <th className="border border-slate-300 bg-gray-100 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {state?.cart?.cartItems?.map((e) => (
            <tr key={e.id}>
              <td>
                <div className="flex items-center">
                  <Image width={40} height={40} src={e.image} />
                  <span className="ml-2">{e.name}</span>
                </div>
              </td>
              <td className="text-center">
                <select  onChange={(event) => updateCartQuantity(e, event.target.value)} value={e.quantity} className=" outline-none" name="cartQuantity" id="cartQuantity">
                  {[...Array(e.countInStock).keys()].map(z => (
                    <option key={z + 1} value={z + 1}>{z + 1}</option>
                  ))}
                </select>
              </td>
              <td className="text-center">${e.quantity * e.price}</td>
              <td className="text-center">
                <FontAwesomeIcon
                onClick={() => removeItemFromCart(e.id)}
                  className="cursor-pointer text-red-600"
                  icon={faTrash}
                />
              </td>
            </tr>
          ))}
          <tr className="text-center font-bold">
              <td className="mt-2 text-gray-600">Total Amount: <span className="text-primary">${totalAmount}</span></td>
          </tr>
        </tbody>
      </table>

      <div className="card w-1/2 px-8 py-8 mx-auto mt-12">
        <p className="text-primary font-bold"><span className="text-gray-600 font-bold">Subtotal: </span>${totalAmount}</p>
        <p className="mt-4 text-primary font-bold"><span className="text-gray-600 font-bold">Total Items: </span>{totalQuantity}</p>
       {totalQuantity <= 0 ? <button disabled className="primary-button mt-8 opacity-50">Checkout</button>: <button onClick={navigateToShipping} className="primary-button mt-8">Checkout</button>} 
      </div>

      </>
  );
};  

export default CartPage