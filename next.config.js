module.exports = {
    images: {
        domains: [
            "links.papareact.com",
            "fakestoreapi.com",
            
        ]
    },

    // we are writing main stripe public key in this next config page then we are fetching this page from checkout.js page
    // by using >>> const stripePromise = loadStripe(process.env.stripe_public_key) so we are fetching my public key from env.local file to here, then passing this to checkout.js
    env: {
        stripe_public_key: process.env.STRIPE_PUBLIC_KEY
    }
}

