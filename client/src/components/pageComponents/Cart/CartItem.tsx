import CartAction from "./CartAction";
export const CartItem = ({ product }: any) => {

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <img
          src={product.product.images[0]}
          alt={product.product.name}
          className="w-20 h-20 object-cover rounded-md"
        />
        <div>
          <h3 className="text-md font-medium">{product.product.name}</h3>
          <p className="text-sm text-gray-500">${product.product.price}</p>
        </div>
      </div>
      <CartAction
        productId={product.id}
        inventoryCount={product.product.inventoryCount}
        quantity={product.quantity}
      />
    </div>
  );
};
