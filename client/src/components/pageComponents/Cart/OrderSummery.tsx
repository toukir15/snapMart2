import { Button } from "@nextui-org/button";
import OrderSummeryLoading from "../../loading/OrderSummeryLoading";

export const OrderSummary = ({ subtotal, shippingFee, total, isLoading }: any) => {
  if (isLoading) {
    return <OrderSummeryLoading />
  }
  return (
    <>
      <div className="border border-gray-200 rounded-lg p-4 h-fit">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <p className="text-gray-700">Subtotal</p>
          <p className="text-gray-700">${subtotal}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-gray-700">Shipping Fee</p>
          <p className="text-gray-700">${shippingFee}</p>
        </div>
        <div className="flex justify-between font-semibold mb-4">
          <p className="text-gray-900">Total</p>
          <p className="text-[#F85606]">${total}</p>
        </div>
        <Button className="w-full bg-[#F85606] text-white py-3 rounded-lg transition">
          Proceed to Checkout
        </Button>
      </div>
    </>
  )
};
