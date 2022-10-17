import Product from "./Product"

function ProductFeed({products}) {
  return (
    <div className="grid  grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">

        {/* SLICE functionality >>> slice(0,4) - shows me first 4 products */}

        {products.slice(0,4).map(({id, title, price, rating, description, category, image}) => (
            <Product 
                key={id}
                id={id}
                title={title}
                description={description}
                category={category}
                image={image}
                price={price}
                rating={rating}

            />
        ) )}


        <img className="md:col-span-full" src="https://links.papareact.com/dyz" alt="" />


        <div className="md:col-span-2">
            {products.slice(4, 5).map(({id, title, price, description, category, image}) => (
                <Product 
                    key={id}
                    id={id}
                    title={title}
                    description={description}
                    category={category}
                    image={image}
                    price={price}

                />
            ) )}
        </div>


        {products.slice(5, products.length).map(({id, title, price, description, category, image}) => (
            <Product 
                key={id}
                id={id}
                title={title}
                description={description}
                category={category}
                image={image}
                price={price}

            />
        ) )}


    </div>
  )
}

export default ProductFeed


