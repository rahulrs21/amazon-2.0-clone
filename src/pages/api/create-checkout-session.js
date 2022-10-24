// Anything is inside  'api' folder is considered to be BACKEND code
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
    // help to access the items from checkout
    const {items, email} = req.body;

    // This will tell the stripe to get the Items from checkout page https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=checkout#redirect-customers 3:45:00
    const transformedItems = items.map((item) => ( {    // we are returning as object
        
        quantity: 1,
        
        

        price_data: {
            currency: 'usd',
            unit_amount: item.price * 100,   // here unit_amount should be defined as 'chillaries' ex: 2RS = 200paise
            product_data: {
                name: item.title,
                images: [item.image],
                description: `${item.description.slice(0,120)} ...`
            },
        },
    } ));



    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],

        shipping_options: [
            {shipping_rate: 'shr_1Lue0JLsrabNQPfKuODOtCxi'}     // Create the shipping rates. https://dashboard.stripe.com/test/shipping-rates 3:57:00  and once u created, copy the ID at the top
        ],

        shipping_address_collection: {
            allowed_countries: ["GB", "US", "CA", "IN", "AE"],           //'Great Britain', 'United States', 'Canada'
        },  
        line_items: transformedItems,


        mode: "payment",
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map(item => item.image)),             // images need to in array format and make stringify
        }
    });

    res.status(200).json( { id: session.id } )


    // WEBHOOKS

    // goto stripr CLI in google download this file https://stripe.com/docs/stripe-cli [follow this guidelines],  https://github.com/stripe/stripe-cli/releases/tag/v1.12.4 In that download 'stripe_1.12.4_windows_x86_64.zip'
    // Unzip the file, place a copy of that unzipped file in this project folder as well. bcz to run below command. u need this file to be there in particular folder

    // 4:15:00  Once installed it, open vscode terminal, here we are forwarding the events to local development. Run this command >>> stripe listen --forward-to localhost:3000/api/webhook  https://stripe.com/docs/cli/listen#listen-forward-to
    // u'll get this  Ready! You are using Stripe API Version [2022-08-01]. Your webhook signing secret is whsec_c664c2ecc12b6422a08b352b103f1832e1e7a0816b09336f3adfa0771d523dce >>> Here copy the secret key
    // paste this secret key 'whsec_c664c2ecc12b6422a08b352b103f1832e1e7a0816b09336f3adfa0771d523dce' in STRIPE_SIGNING_SECRET which is in 'env.local' file

};