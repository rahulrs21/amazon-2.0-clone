import Image from "next/image"; 
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline"

// import { useSession, signIn, signOut } from "next-auth/react"   //next-auth/client was renamed to next-auth/react in v4
import { signIn, signOut, useSession } from "next-auth/react"    //npm install next-auth

 // in NextJS we have builtin Router
import { useRouter } from "next/router";    
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

function Header() {

  const { data: session, status } = useSession()
  const loading = status === "loading"

  const router = useRouter()

  const items = useSelector(selectItems)     // This can fetch the data from REDUX STORE. Now we r fetching data of 'addItemToBasket' which is Product.js

  return (
    <header>
        {/* top nav */}
        <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
            <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
                <Image 
                    onClick={() => router.push('/')}       // router.push() works like 'google back button' as a stack 2:15:00
                    src="https://links.papareact.com/f90"   // need to link this image address in next.config.js
                    width={150}
                    height={40}
                    objectFit="contain"
                    className="hover:cursor-pointer"
                 />
            </div>
            {/* Search bar */}
            <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
              <input type="text" placeholder="search anything" className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" />
              <MagnifyingGlassIcon className="h-12 p-4 text-black" /> 
            </div>

            {/* Rightside  */}
            <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
              <div onClick={!session ? signIn : signOut} className="link">
                <p>
                  {session ? `Hello, ${session.user.name}` : `Sign In`}
                </p>
                <p className="font-extrabold md:text-sm ">Account & Lists</p>
              </div>

              <div onClick={() => router.push('/orders')} className="link">
                <p>Returns</p>
                <p className="font-extrabold md:text-sm ">& Orders</p>
              </div>

              <div onClick={() => router.push('/checkout')} className="relative link flex items-center">
                <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">{items.length}</span>
                <ShoppingCartIcon className="h-10" />
                <p className="hidden md:inline font-extrabold md:text-sm  mt-2">Basket</p>
              </div>
            </div>

        </div>

        {/* bottom nav */}
        <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm"> 
          <p className="link flex items-center"> <Bars3Icon className="h-6 mr-1" /> All </p>
          <p className="link">Prime Video</p>
          <p className="link">Amazon Business</p>
          <p className="link">Today's Deals</p>
          <p className="link hidden lg:inline-flex ">Electronics</p>
          <p className="link hidden lg:inline-flex ">Food & Grocery</p>
          <p className="link hidden lg:inline-flex ">Prime</p>
          <p className="link hidden lg:inline-flex ">Buy Again</p>
          <p className="link hidden lg:inline-flex ">Shopper Toolkit</p>
          <p className="link hidden lg:inline-flex ">Health & Personal Care</p>
        </div>
    </header>
  )
}

export default Header





// import Image from "next/image"; 
// import {
//   Bars3Icon,
//   MagnifyingGlassIcon,
//   ShoppingCartIcon,
// } from "@heroicons/react/24/outline"
// import { useState } from "react";



// function Header({products}) {


//   const [value, setValue] = useState('');

//   const onChange = (event) => {
//     setValue(event.target.value);
//   }
  
//   const onSearch = (searchTerm) => {
//     console.log('search', searchTerm);
//   }


//   return (
//     <header>
//         {/* top nav */}
//         <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
//             <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
//                 <Image 
//                     src="https://links.papareact.com/f90"   // need to link this image address in next.config.js
//                     width={150}
//                     height={40}
//                     objectFit="contain"
//                     className="hover:cursor-pointer"
//                  />
//             </div>
//             {/* Search bar */}
//             <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
//               <input placeholder="search anything" type="text" value={value} onChange={onChange} className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" />
//               <MagnifyingGlassIcon className="h-12 p-4 text-white" onClick={() => onSearch(value)} />
//             </div>

//             {/* Rightside  */}
//             <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
//               <div className="link">
//                 <p>Hello Rahul RS</p>
//                 <p className="font-extrabold md:text-sm ">Account & Lists</p>
//               </div>

//               <div className="link">
//                 <p>Returns</p>
//                 <p className="font-extrabold md:text-sm ">& Orders</p>
//               </div>

//               <div className="relative link flex items-center">
//                 <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">0</span>
//                 <ShoppingCartIcon className="h-10" />
//                 <p className="hidden md:inline font-extrabold md:text-sm  mt-2">Basket</p>
//               </div>
//             </div>

//         </div>

        
//          {/* dispayAuto */}
//          <div className="relative z-50">
//             <div className="absolute bg-white w-full mx-auto">
//                 {products.filter(item => {
//                   const searchTerm = value.toLowerCase();
//                   const titleName = item.title.toLowerCase();

//                   return searchTerm && (titleName.startsWith(searchTerm))
//                 })
//                 .map((item) => (
//                   <div className="bg-white flex flex-col text-xs md:text-sm  pl-12 cursor-pointer my-2 text-left hover:bg-gray-100">
//                       {item.title}
//                   </div>
//                 ) )}
//             </div>
//          </div>


            

//         {/* bottom nav */}
//         <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm"> 
//           <p className="link flex items-center"> <Bars3Icon className="h-6 mr-1" /> All </p>
//           <p className="link">Prime Video</p>
//           <p className="link">Amazon Business</p>
//           <p className="link">Today's Deals</p>
//           <p className="link hidden lg:inline-flex ">Electronics</p>
//           <p className="link hidden lg:inline-flex ">Food & Grocery</p>
//           <p className="link hidden lg:inline-flex ">Prime</p>
//           <p className="link hidden lg:inline-flex ">Buy Again</p>
//           <p className="link hidden lg:inline-flex ">Shopper Toolkit</p>
//           <p className="link hidden lg:inline-flex ">Health & Personal Care</p>
//         </div>


       
//     </header>
//   )
// }

// export default Header