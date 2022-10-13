import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import { Menu } from "@headlessui/react";

const Navbar = () => {
  const { state } = useContext(ShoppingCartContext);
  const { data: session } = useSession();
  const totalQuantity = state?.cart?.cartItems.reduce((acc, e) => {
    acc = acc + e.quantity;
    return acc;
  }, 0);

  const logout = () => {
    signOut({callbackUrl: "/login"})
  }

  return (
    <nav className="flex items-center justify-between bg-gray-50 px-4 py-4 shadow-md">
      <div>
        <Link href={"/"} passHref>
          <span className="font-bold text-gray-600 cursor-pointer">
            Ecommerce Store
          </span>
        </Link>
      </div>

      <div>
        <Link href={"/cart"} passHref className="font-bold mx-4 text-gray-600">
          Cart
        </Link>
        <span className=" bg-red-600 text-white px-2 py-1 rounded-xl">
          {totalQuantity}
        </span>

        {session?.user ? (
          <Menu as="div" className="relative inline-block">
            <Menu.Button>
              {" "}
              <span className="mx-2 font-bold">{session?.user?.name}</span>
            </Menu.Button>
            <Menu.Items className="absolute right-0 w-36 origin-top-right shadow-lg flex flex-col bg-white mt-4">
              <Menu.Item className="pt-6 font-medium text-gray-600 ">
                <button >Profile</button>
              </Menu.Item>

              <Menu.Item className="py-4 font-medium text-gray-600 ">
                <button onClick={logout}>Logout</button>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        ) : (
          <Link href={"/login"}>
            <span className="primary-button cursor-pointer">Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
