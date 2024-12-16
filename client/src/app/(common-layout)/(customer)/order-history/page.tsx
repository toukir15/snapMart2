import React from "react";

const OrderHistory = () => {
  const orders = [
    {
      id: "ORD123456",
      date: "2024-12-01",
      status: "Delivered",
      customer: "John Doe", // Only for vendor view
      vendor: "Jordan Official Store", // Only for customer view
      items: [
        { name: "Jordan 4 Retro", price: 250, quantity: 1 },
        { name: "Jordan 1 Low", price: 200, quantity: 2 },
      ],
      total: 650,
    },
    {
      id: "ORD789012",
      date: "2024-12-05",
      status: "Shipped",
      customer: "Jane Smith", // Only for vendor view
      vendor: "Nike Sportswear", // Only for customer view
      items: [
        { name: "Nike Air Max 90", price: 180, quantity: 1 },
        { name: "Nike Dunk Low", price: 170, quantity: 1 },
      ],
      total: 350,
    },
  ];

  const isVendor = true; // Change to `false` for Customer View

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">
        {isVendor ? "Order History (Vendor)" : "Order History (Customer)"}
      </h1>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        {orders.map((order) => (
          <div key={order.id} className="mb-6">
            <div className="p-4 bg-white border rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    Order ID: {order.id}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Date: {order.date} | Status:{" "}
                    <span
                      className={`font-medium ${
                        order.status === "Delivered"
                          ? "text-green-500"
                          : "text-blue-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>
                </div>
                <p className="text-gray-700 font-medium">
                  Total: ${order.total}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">
                  {isVendor ? "Customer" : "Shop"}:{" "}
                  <span className="text-gray-800 font-medium">
                    {isVendor ? order.customer : order.vendor}
                  </span>
                </p>
              </div>
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-2">Items:</h3>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <p className="text-gray-800">
                        {item.name} (x{item.quantity})
                      </p>
                      <p className="text-gray-700">
                        ${item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
