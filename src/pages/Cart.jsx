import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteItemFromCartAsync, selectCart, updateCartAsync } from "../utils/cartSlice";

const Cart = () => {
  const items = useSelector(selectCart)
  const dispatch = useDispatch()
  const totalAmmount = items.reduce((amount, item)=> amount+ item.price*(1-item.discountPercentage/100)*item.quantity, 0);
  const totalItemCount = items.reduce((amount, item)=> amount+ item.quantity, 0);


  const handleQty = (e, product)=>{
    dispatch(updateCartAsync({...product, quantity: +e.target.value}))
  }

  const handleRemove = (id)=>{
    dispatch(deleteItemFromCartAsync(id))
  }

  return (
    <>
      <div className="mx-auto bg-white rounded-lg mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 py-2">
          Cart
        </h1>
        <div className=" border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {items.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      alt={product.title}
                      src={product.images[0]}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={product.href}>{product.title}</a>
                        </h3>
                        <p className="ml-4">{Math.round((product.price)*(1 - product.discountPercentage/100))*product.quantity}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product?.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                      <label htmlFor="quantity" className="inline mr-5 text-sm font-medium leading-6 text-gray-900">
                  Qty
                </label>
                        <select onChange={(e)=> handleQty(e, product)} value={product.quantity}>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                        </select>
                      </div>

                      <div className="flex">
                        <button
                          type="button"
                          onClick={()=> handleRemove(product.id)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${Math.round(totalAmmount)}</p>
          </div>
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Total Items</p>
            <p>{totalItemCount} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <Link to="/">
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
