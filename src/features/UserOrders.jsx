import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoggedInUserOrderAsync,
  selectUserInfo,
  selectUserOrders,
} from "../utils/userSlice";

const UserOrders = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders);
  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync(user.id));
  }, []);
  return (
    <div>
      {orders.map((order) => (
        <div key={order.id}>
          <div className="mx-auto bg-white rounded-lg mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 py-2">
              Order #{order.id}
            </h1>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 py-2">
              Status : {order.status}
            </h1>
            <div className=" border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.items.map((product) => (
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
                            <p className="ml-4">
                              {Math.round(
                                product.price *
                                  (1 - product.discountPercentage / 100)
                              ) * product.quantity}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {product?.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty : {product.quantity}
                            </label>
                          </div>

                          <div className="flex"></div>
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
                <p>${Math.round(order.totalAmmount)}</p>
              </div>
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Total Items</p>
                <p>{order.totalItemCount} items</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Address : {order.selectedAddress.street}, 
                {order.selectedAddress.city} ,{order.selectedAddress.state},
                {order.selectedAddress.pinCode}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default UserOrders;
