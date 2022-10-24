import Image from "next/image"
import { useSelector } from "react-redux"
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header"
import { selectItems, selectTotal } from "../slices/basketSlice"
import Currency from 'react-currency-formatter';
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key)  // here we installing PUBLIC KEY to start the session and to get access to stripe account
// to get the publishable key : go here https://dashboard.stripe.com/test/apikeys


function Checkout() {

  const items = useSelector(selectItems); 
  const total = useSelector(selectTotal);

  const { data: session } = useSession()

  const createCheckOutSession = async () => {
    const stripe = await stripePromise;

    // Call the backend to create checkout session...
    // need to create new file called 'create-checkout-session.js' inside 'api'. This gonna be backend

    // Now install 'AXIOS'   npm i axios  >>> how we gonna make sort of network cause

    const checkoutSession = await axios.post('/api/create-checkout-session', {
        items: items, 
        email: session.user.email
    });


    // redirect the user/customer to stripe checkout   4:00:00
    const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id,
    })


    if(result.error) {
        alert(result.error.message)
    }

  }

  return (
    <div className="bg-gray-100">
        <Header />

        <main className="lg:flex max-w-screen-2xl mx-auto">
            {/* Left */}
            <div className="flex-grow m-5 shadow-sm">
                <Image
                    src="https://links.papareact.com/ikj"
                    width={1020}
                    height={250}
                    objectFit="contain"
                />

                <div className="flex flex-col p-5 space-y-10 bg-white">
                    <h1 className="text-3xl border-b pb-4">{items.length === 0 ? `Your Shopping Basket is Empty` : `Shopping Basket`} </h1>

                    {items.map((item, i) => (   // 'i' is 'index'
                        <CheckoutProduct
                            key={i}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            description={item.description}
                            category={item.category}
                            image={item.image}
                            hasPrime={item.hasPrime}
                            rating={item.rating}
                        />
                    ))}
                </div>

            </div>


            {/* Right */}
            <div className="flex flex-col bg-white p-10 shadow-md">
                {items.length > 0 && (
                    <div>
                        <h2 className="whitespace-nowrap">Subtotal { items.length } items :  {" "}
                            <span className="font-bold">
                                <Currency quantity={total} currency="USD" />
                            </span>
                        </h2>

                        <button role="link" onClick={createCheckOutSession} disabled={!session} className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                            {!session ? 'Sign in to Checkout' : 'Proceed to Checkout'}
                        </button>

                        {/* STRIPE SESSION starts 3:18:00 */}
                    </div>
                )}
            </div>
        </main>
    </div>
  )
}

export default Checkout