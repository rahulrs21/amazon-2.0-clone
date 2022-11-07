import Header from "../components/Header"
import {CheckCircleIcon} from "@heroicons/react/24/solid"
import { useRouter } from "next/router"

function success() {

    const router = useRouter();

  return (
    <div className="bg-gray-100 h-screen">
        <Head>
            <title>Amazon 2.0 - Success</title>
            <link rel="icon" type="image/x-icon" href="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png"></link>
        </Head>
        <Header />

        <main className="max-w-screen-lg mx-auto">
            <div className="flex flex-col p-10 bg-white">
                <div className="flex items-center space-x-2 mb-5">
                    <CheckCircleIcon className="text-green-500 h-10" />
                    <h1 className="text-3xl ">Thank you, Your order has been confirmed successfully!</h1>
                </div>

                <p>
                    Thank you for shopping with us. We'll send you a confirmation of item has shipped, if you would like to check the status of order(s) please press the link below.
                </p>

                <button onClick={() => router.push('/orders')} className="button mt-8">Go to my Orders</button>

            </div>
        </main>
    </div>
  )
}

export default success