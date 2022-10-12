import Image from "next/image"
import { useState } from "react"
import { StarIcon } from "@heroicons/react/24/solid"

// import Currency from 'react-currency-formatter';



const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({id, title, price, description, category, image}) {

//   Generating Random stars
  const [rating, setRating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    
  );

//   Generating Random Prime memeber
  const [hasPrime] = useState( Math.random() < 0.5 )   // Math.random generates number b/w 0 and 1. so wrote 0.5

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
            {/* <Currency quantity={price} currency="EUR" /> */}
            $ {price}
        </div>
        

        {hasPrime && (
            <div className="flex items-center space-x-2 -mt-5">
                <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
                <p className="text-xs text-gray-500">Free Next Day Delivery</p>
            </div>
        )}


        <button className="mt-auto button">Add to Cart</button>
        
    </div>
  )
}

export default Product