import { StarIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useEffect, useState } from "react";

import Currency from 'react-currency-formatter';
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

function CheckoutProduct({ id, title, price, rating, description, category, image, hasPrime }) {

  const dispacth = useDispatch();

  const [cart, setCart] = useState(false)
  const [removecart, setremoveCart] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setCart(false)
    }, 2000)
  }, [cart])

  
  const addItemToBasket = () => {
    const product = {
        id, 
        title,
        price,
        rating,
        description,
        category,
        image,
        hasPrime
    }
    dispacth(addToBasket(product))   // push item into REDUX STORE

    setCart(true)

  }

  const removeItemToBasket = () => {
    // Remove item from REDUX
    dispacth(removeFromBasket({ id }))

  }

  return (
    <div className="grid grid-cols-5">
        
        <Image src={image} height={200} width={200} objectFit="contain" />

        {/* Middle Section */}
        <div className="col-span-3 mx-5">
            <p>{title ? title : `no title`}</p>
            <div className="flex mt-2">
                {Array(rating).fill().map( (_, i) => (              // (_, i) -> we dont care about first parameter. so we put underscore, i is index
                    <StarIcon className="h-5 text-yellow-500" />    
                ) )}
            </div>
            <p className="text-xs md:text-base my-2 line-clamp-3">{description}</p>

            <div className="mb-4">
                <Currency quantity={price} currency="USD" />
            </div>      

            {hasPrime && (
                <div className="flex relative items-center space-x-2 -mt-5">
                    <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
                    <p className="text-xs text-gray-500">Free Next Day Delivery</p>
                </div>
            )}
        </div>
            
        {/* Right Add/Remove button  */}
        <div className="flex flex-col space-y-2 my-auto justify-self-end">
            <button className={cart ? `button_added_to_cart` : `button`} onClick={addItemToBasket}>{cart ? `Added successfully` : `Add to Basket`}</button>
            <button className="button" onClick={removeItemToBasket}>Remove<span className="hidden md:inline-block"> from Basket</span></button>
        </div>
    </div>
  )
}

export default CheckoutProduct