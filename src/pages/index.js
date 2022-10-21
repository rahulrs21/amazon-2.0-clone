import { getSession } from "next-auth/react";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
        <link rel="icon" type="image/x-icon" href="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png"></link>
      </Head>

      {/* header */}
      <Header products={products} />
      
      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />

        {/* ProductFeed */}
        <ProductFeed products={products} />

      </main>
    </div>
  );
}


// SSR
export async function getServerSideProps (context) {

  // to prevent login glitch when we hit refresh, we use this session 5:23:00
  const session = await getSession(context);

  const products = await fetch("https://fakestoreapi.com/products").then(
      (res) => res.json()
  );

  return {
      props: {
          products,
          session,
      },
  }
}


// GET >>> https://fakestoreapi.com/products