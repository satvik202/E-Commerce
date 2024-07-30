import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { deleteItemFromCartAsync, selectCart, updateCartAsync } from "../utils/cartSlice";
import { useForm } from "react-hook-form";
import { selectLoggedInUser, updateUserAsync } from "../utils/authSlice";
import { useState } from "react";
import { createOrderAsync } from "../utils/orderSlice";



const Checkout = () => {
  const items = useSelector(selectCart)
  const user = useSelector(selectLoggedInUser)
  const dispatch = useDispatch()
  const totalAmmount = items.reduce((amount, item)=> amount+ item.price*(1-item.discountPercentage/100)*item.quantity, 0);
  const totalItemCount = items.reduce((amount, item)=> amount+ item.quantity, 0);

  const [selectedAddress, setSelectedAddress] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState(null)

  const handleAddress = (e)=>{
    setSelectedAddress(user.addresses[e.target.value]);
    // console.log(selectedAddress)
  }
  const handlePayment= (e)=>{
    setPaymentMethod(e.target.value)
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const handleQty = (e, product)=>{
    dispatch(updateCartAsync({...product, quantity: +e.target.value}))
  }

  const handleRemove = (id)=>{
    dispatch(deleteItemFromCartAsync(id))
  }
  
  const handleOrder = ()=>{
    const order = {items, totalAmmount, totalItemCount, user, paymentMethod, selectedAddress}
    dispatch(createOrderAsync(order))
    // TODO : Clear Cart and redirect to orderSuccess page
  }
  

  return (
    
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {!items.length && <Navigate to='/' replace={true}></Navigate>}
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <form className="bg-white px-6 mt-12 py-12 pt-2" noValidate onSubmit={
            handleSubmit((data)=> {
              // console.log(data)
              dispatch(updateUserAsync({...user,addresses : [...user.addresses, data]}))
              reset()
            })}
            >
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full name
                    </label>
                    <div className="mt-2">
                      <input
                        {...register('name', {required: 'name is required'})}
                        id="name"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>


                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        {...register('email', {required: 'email is required'})}
                        type="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        {...register('phone', {required: 'phone number is required'})}
                        type="tel"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        id="street"
                        {...register('street', {required: 'street is required'})}
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        id="city"
                        {...register('city', {required: 'city is required'})}
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        id="region"
                        {...register('state', {required: 'state is required'})}
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="pinCode"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        id="pinCode"
                        {...register('pinCode', {required: 'pincode is required'})}
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Reset
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Address
              </button>
            </div>

              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Address
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Choose from existing address
                </p>

                <ul role="list" className="divide-y divide-gray-100">
                  {user.addresses.map((address, ind) => (
                    
                    <li
                      key={ind}
                      className="flex justify-between gap-x-6 py-5 border-b border-gray-200"
                    >
                        
                      <div className="flex min-w-0 gap-x-4">
                        
                        <input
                          onChange={(e)=>handleAddress(e)}
                          value = {ind}
                          id="address"
                          name="address"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <div className="min-w-0 flex-auto">
                            
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {address.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address.street},{address.city}, {address.state}, {address.pincode}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            Phone: {address.phone}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 space-y-10 border-t border-gray-200">
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">
                      Payment Methods
                    </legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose
                    </p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="cash"
                          name="payments"
                          onChange={(e)=>handlePayment(e)}
                          checked={paymentMethod=="cash"}
                          value = "cash"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="cashPayment"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Cash
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="card"
                          onChange={(e)=>handlePayment(e)}
                          checked={paymentMethod=="card"}
                          value = "card"
                          name="payments"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="cardPayment"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Card
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>


          </form>
        </div>
        <div className="lg:col-span-2">
        <div className="mx-auto bg-white rounded-lg mt-12 max-w-7xl px-2 sm:px-2 lg:px-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 py-2">
          Cart
        </h1>
        <div className=" border-t border-gray-200 px-0 py-6 sm:px-0">
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
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
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

        <div className="border-t border-gray-200 px-2 py-6 sm:px-2">
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
          <div className="mt-6 cursor-pointer">
            <div 
              onClick={handleOrder}
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Order Now
            </div>
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
        </div>
      </div>
    </div>
  );
};
export default Checkout;