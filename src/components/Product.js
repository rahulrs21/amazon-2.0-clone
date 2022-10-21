import Image from "next/image"
import { useEffect, useState } from "react"
import { StarIcon } from "@heroicons/react/24/solid"

import Currency from 'react-currency-formatter';
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";



const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({id, title, price, description, category, image}) {

  const dispatch = useDispatch()  // helps to push the data to REDUX STORE

//   Generating Random stars
  const [rating, setRating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    
  );

//   Generating Random Prime memeber
  const [hasPrime] = useState( Math.random() < 0.5 )   // Math.random generates number b/w 0 and 1. so wrote 0.5 like boolean

  const [cart, setCart] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setCart(false)
    }, 2000)
  }, [cart])

  // Add to basket function
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
    };

    // sending the product  as an action to the REDUX STORE 
    dispatch(addToBasket(product))     // pushing product to addToBasket which is defined in 'basketSlice redux store'

    console.log("Product TITLE = ",title )

    setCart(true)
  }

  return (
    <div  className="relative flex flex-col m-5 bg-white z-30 p-10 ">
        <p className="absolute top-2 right-2 text-xs italic text-gray-400">{category}</p>

        <Image
            src={image}
            height={200}
            width={200}
            objectFit="contain"
        />

        <h4 className="my-3">{title}</h4>

        <div className="flex">
            {Array(rating).fill().map( (_, i) => (              // (_, i) -> we dont care about first parameter. so we put underscore, i is index
                <StarIcon className="h-5 text-yellow-500" />    
            ) )}
        </div>

        <p className="text-xs my-2 line-clamp-2">{description}</p>
        {/* "@tailwindcss/line-clamp"  helps to short the sentence >>> line-clamp-2 means, after 2 line it will cut the sentence >>> this is applied in tailwindcss*/}


        {/* Currency */}
        {/* here  we need to install react currency formatter https://www.npmjs.com/package/react-currency-formatter */}
        <div className="mb-5">
            <Currency quantity={price} currency="USD" />
        </div>
        

        {hasPrime && (
            <div className="flex items-center space-x-2 -mt-5">
                <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
                <p className="text-xs text-gray-500">Free Next Day Delivery</p>
            </div>
        )}


        <button onClick={addItemToBasket} className={cart ? `mt-auto button_added_to_cart` : `mt-auto button`}>{cart ? `Added to cart successfully` : `Add to Cart`}</button>
        
    </div>
  )
}

export default Product