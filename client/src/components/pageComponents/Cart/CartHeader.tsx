export const CartHeader = ({ shopName, totalPrice }: any) => (
  <div className="p-4 bg-gray-100 flex justify-between items-center">
    <h2 className="text-lg font-medium">{shopName}</h2>
    <p className="text-sm text-gray-500">Total: ${totalPrice}</p>
  </div>
);
