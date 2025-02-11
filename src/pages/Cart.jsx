import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { deleteItemFromCartAsync, selectCart, updateCartAsync } from "../utils/cartSlice";
import Modal from "../features/Modal"
import { useState } from "react";
import { discountedPrice } from "../utils/constants";
const Cart = () => {
  const [openModal, setOpenModal] = useState(null);
  const items = useSelector(selectCart)
  const dispatch = useDispatch()
  const totalAmmount = items.reduce((amount, item)=> amount+ item.product.price*(1-item.product.discountPercentage/100)*item.quantity, 0);
  const totalItemCount = items.reduce((amount, item)=> amount+ item.quantity, 0);


  const handleQty = (e, product)=>{
    dispatch(updateCartAsync({id:product.id, quantity: +e.target.value}))
  }

  const handleRemove = (e, id)=>{
    dispatch(deleteItemFromCartAsync(id))
  }

  return (
    <>
    {<Modal/>}
    {!items.length && <Navigate to='/' replace={true}></Navigate>}
    
      <div className="mx-auto bg-white rounded-lg mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 py-2">
          Cart
        </h1>
        <div className=" border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {items.map((product) => (
                <li key={product.product.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      alt={product.product.title}
                      src={product.product.images[0]}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={product.product.id}>{product.product.title}</a>
                        </h3>
                        <p className="ml-4">{discountedPrice(product.product)*product.quantity}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.product?.brand}
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
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                        </select>
                      </div>

                      <div className="flex">
                      <Modal
                            title={`Delete ${product.product.title}`}
                            message="Are you sure you want to delete this Cart item ?"
                            dangerOption="Delete"
                            cancelOption="Cancel"
                            dangerAction={(e) => handleRemove(e, product.id)}
                            cancelAction={()=>setOpenModal(null)}
                            showModal={openModal === product.product.id}
                          ></Modal>
                        <button
                          type="button"
                          // onClick={()=> handleRemove(product.id)}
                          onClick={e=>{setOpenModal(product.product.id)} }
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
