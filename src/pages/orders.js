import { getSession, useSession } from "next-auth/react"
import db from "../../firebase";
import Header from "../components/Header"
import moment from "moment"  // npm i moment
import Order from "../components/Order";

function order({ orders }) {

  const {data: session} = useSession(); 

  console.log("The orders are ", orders)

  return (
    <div>
        <Head>
          <title>Amazon 2.0 - Orders</title>
          <link rel="icon" type="image/x-icon" href="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png"></link>
        </Head>

        <Header /> 

        <main className="max-w-screen-lg mx-auto p-10">  
            <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">Your Orders</h1>
            
            {session ? (
              <h2>{orders.length===1 ? `${orders.length} Order` : `${orders.length} Orders`}</h2>
            ): (
              <h2>Please sign in to see your orders</h2>
            )}

            <div className="mt-5 space-y-4">
              {orders?.map(({ id, amount, amountShipping, items, timestamp, images }) => (
                <Order
                  key={id}
                  id={id}
                  amount={amount}
                  amountShipping={amountShipping}
                  items={items}
                  timestamp={timestamp}
                  images={images}
                />
              ) )}
            </div>

        </main>
    </div>
  )
}

export default order


// SSR

export async function getServerSideProps(context) {
  // we need stripe authentication
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  // Get the user logged in credentials
  const session = await getSession(context)               // same as frontend, rather that using useSession(), we use 'getSession() in backend'

  if(!session) {
    return {
      props: {}
    }
  }

  const stripeOrders = await db
  .collection('users')
  .doc(session.user.email)
  .collection('orders')
  .orderBy('timestamp', 'desc')
  .get();


  // Stripe Orders 5:04:40    // Now u need to goto every single firebase document and get theb proper stripe data from stripe api
  // so u need to go through loop and request each one. So wrap entire thing with Promise.all() means 'it will wait until all those promises resolved, then it will proceed'
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      // returning object
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      // translate this timestamp to unix value(is a long number, u can convert that number back to actual date)
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (  //5:07:40
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100
        })
      ).data, 
    }))
  );

  return {
    props: {
      orders,
    }
  }

}
