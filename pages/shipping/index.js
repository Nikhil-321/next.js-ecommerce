import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import ShippingComponent from "../../components/checkout/ShippingComponent";
import PaymentScreen from "../../components/checkout/PaymentScreen";

const Shipping = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const changeTab = (index) => {
    console.log("index", index);
    setSelectedIndex(index);
  };

  return (
    <>
      <div className="mt-4">
        <Tab.Group
          selectedIndex={selectedIndex}
          onChange={(index) => changeTab(index)}
        >
          <Tab.List className="flex items-center justify-between border-b-2 border-primary">
            <Tab
              className={`outline-none font-bold py-2 text-gray-600 ${
                selectedIndex === 0 ? "text-primary" : ""
              }`}
            >
              Shipping Address
            </Tab>
            {selectedIndex < 1 ? (
              <Tab
                disabled
                className={`outline-none font-bold py-2 text-gray-600 ${
                  selectedIndex === 1 ? "text-primary" : ""
                }`}
              >
                Payment Method
              </Tab>
            ) : (
              <Tab
                className={`outline-none font-bold py-2 text-gray-600 ${
                  selectedIndex === 1 ? "text-primary" : ""
                }`}
              >
                Payment Method
              </Tab>
            )}
            <Tab
              className={`outline-none font-bold py-2 text-gray-600 ${
                selectedIndex === 2 ? "text-primary" : ""
              }`}
            >
              Place Order
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              {
                <ShippingComponent
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                />
              }
            </Tab.Panel>
            <Tab.Panel>
              {
                <PaymentScreen
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                />
              }
            </Tab.Panel>
            <Tab.Panel>Content 3</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

Shipping.auth = true;

export default Shipping;
