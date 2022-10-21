import moment from "moment/moment"
import Currency from "react-currency-formatter"

function Order({ id, amount, amountShipping, items, timestamp, images }) {
  return (
    <div className="relative border rounded-md">
        <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
            <div>
                <p className="font-bold text-xs">ORDER PLACED</p>
                <p>{moment.unix(timestamp).format('DD MMM YYYY')}</p>
            </div>

            <div>
                <p className="text-xs font-bold">TOTAL</p>
                <p>
                    <Currency quantity={amount} currency='usd' /> - Next Day Delivery{" "}
                    <Currency quantity={amountShipping} currency='usd' />
                </p>
            </div>

            <p className="text-xs whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">{items.length===1 ? `${items.length} item` : `${items.length} items`}</p>
            
            <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">Order # {id}</p> 
            {/* truncate - it will cut the text if it exceed the limit */}
        </div>


        <div className="p-5 sm:p-10">
            <div className="flex space-x-6 overflow-x-auto">
                {images.map(image => (
                    <img className="h-20 object-contain sm:h-32" src={image} alt="Image" />
                ) )}
            </div>
        </div>

    </div>   
  )
}

export default Order
