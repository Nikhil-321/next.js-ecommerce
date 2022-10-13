import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";

const ShippingComponent = ({selectedIndex, setSelectedIndex}) => {

   
    const {state, dispatch} = useContext(ShoppingCartContext)
    const {cart} = state
    const {shippingAddress} = cart

    useEffect(() => {
        setValue("fullname", shippingAddress.fullname)
        setValue("address", shippingAddress.address)
        setValue("city", shippingAddress.city)
        setValue("postalCode", shippingAddress.postalCode)
        setValue("country", shippingAddress.country)

    }, [shippingAddress])

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue
  } = useForm();

  const onSubmit = (data) => {
    dispatch({type: "SAVE_SHIPPING_ADDRESS", payload: {...data}})
    console.log("State in shipping component", state)
    setSelectedIndex(selectedIndex + 1)

  };

  return (
    <div className="mt-8">
      <h2 className="font-medium text-gray-600">Shipping Address</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 w-1/2 mx-auto">
          <label
            htmlFor="fullname"
            className="block text-gray-700 font-medium mb-2"
          >
            Full Name
          </label>
          <input
            {...register("fullname", { required: "Full Name is required" })}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-500 text-xs">{errors.fullname?.message}</p>
        </div>

        <div className="mt-2 w-1/2 mx-auto">
          <label
            htmlFor="address"
            className="block text-gray-700 font-medium mb-2"
          >
            Address
          </label>
          <input
            {...register("address", {
              required: "Address is required",
              minLength: {
                value: 4,
                message: "Address should contain min length of 4",
              },
            })}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-500 text-xs">{errors.address?.message}</p>
        </div>

        <div className="mt-2 w-1/2 mx-auto">
          <label
            htmlFor="city"
            className="block text-gray-700 font-medium mb-2"
          >
            City
          </label>
          <input
            {...register("city", {
              required: "City is required",
              minLength: {
                value: 2,
                message: "City should contain min length of 2",
              },
            })}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-500 text-xs">{errors.city?.message}</p>
        </div>

        <div className="mt-2 w-1/2 mx-auto">
          <label
            htmlFor="postal"
            className="block text-gray-700 font-medium mb-2"
          >
            Postal Code
          </label>
          <input
            {...register("postalCode", {
              required: "Postal Code is required",
              minLength: {
                value: 3,
                message: "Postal Code should contain min length of 3",
              },
            })}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-500 text-xs">{errors.postalCode?.message}</p>
        </div>

        <div className="mt-2 w-1/2 mx-auto">
          <label
            htmlFor="postal"
            className="block text-gray-700 font-medium mb-2"
          >
            Country
          </label>
          <input
            {...register("country", {
              required: "Country is required",
            })}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-500 text-xs">{errors.country?.message}</p>
        </div>
        <div className="mt-8 w-1/2 mx-auto">
          <button type="submit" className="primary-button">Next</button>
        </div>
      </form>
    </div>
  );
};


export default ShippingComponent;
