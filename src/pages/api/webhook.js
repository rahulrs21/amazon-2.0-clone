// 4:18:00

// we need package called 'micro' >>> [npm i micro] and 'firebase-admin'(now we doing backend firebase) >>> [npm i firebase-admin]

import { buffer } from "micro";
import * as admin from "firebase-admin";


/*        SECURE A CONNECTION TO FIREBASE FROM THE BACKEND             */

// 4:23:00 - goto firebase console in chrome, then goto >> project setting >> service account section >> once u click 'generate new private key', it'll download a JSON file.
// copy and paste this file into our project folder. and just rename the file as 'permissions.json'

const serviceAccount = require('../../../permissions.json');

//4:26:10 >> !admin.apps.length - If there is no app is already initialized 
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)    //certificates- cert() -> The path to a service account key JSON file or an object representing a service account key.
}) : admin.app();    // : admin.app() --> otherwise use the app which has been initialized.





/*  Establish connection to Stripe  */
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;


const fullfillOrder = async (session) => {
    // console.log("Fullfilling Order", session)

    // before writing firestore, u need to set the firestore in firebase console
    return app
    .firestore()
    .collection('users')
    .doc(session.metadata.email)    // metadata pushed in create-checkout.session.js page
    .collection('orders')
    .doc(session.id).set({          // session.id is a id of item which is stored in checkout stripe page
        amount: session.amount_total / 100,   // In  stripe we wrote as 'chillaries/pounds' now we converting to 'rupess/dollar'
        amount_shipping: session.total_details.amount_shipping / 100,   //DOUBT 4:39:10
        images: JSON.parse(session.metadata.images),            //JSON.parse() -  This will convert string into JSON. opposite of 'stringify'
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    })  
    .then(() => {
        console.log(`SUCCESS: Order ${session.id} had been added to database!!`);
    })          
}


export default async (req, res) => {
    // req.method checks whether the request is get or post
    if(req.method === "POST") {  
        //Here  we need to verify the events(data) which comes from stripe, so we use certificates   https://stripe.com/docs/connect/webhooks (but made some modifications here)

        const requestBuffer = await buffer(req);   // helps to generate some certificates
        const payload = requestBuffer.toString(); // toString() method returns a string representing the object.
        const sig = req.headers["stripe-signature"];  // gets the stripe signature. req.headers - The headers read-only property of the Request

        let event;


        // VERIFY THAT 'EVENT' POSTED CAME FROM 'STRIPE' https://stripe.com/docs/connect/webhooks 4:32:25
        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (err) {
            console.log('ERROR', err.message);
            return res.status(400).send(`Webhook error: ${err.message}`);
        }

        /* if it gets pass this above phase, then event going to be legit   >> legit - conforming to the rules ,  truly; genuinely. */
        
        // Handle the checkout.session.completed event
        if(event.type === 'checkout.session.completed') {
            const session = event.data.object;

            // Fulfill the order
            return fullfillOrder(session)
            .then(() => res.status(200))
            .catch(err => res.status(400).send(`Webhook Error: ${err.message}`) );
        }
    }
}


// config each endpoint with a config file and u can change the config file by doing below code.

export const config = {
    //change the api setting by disable bodyParser
    api: {
        bodyParser: false,    // bcz, when we handling webook, we dont want bodyParser >> "Body-parser" parses(describing metadata) is an HTTP request body that usually helps when you need to know more than just the URL being hit.
        externalResolver: true,   // this is for "stripe" which is not handled by us
    }
}


// after this, YOU SHOULD RUN THIS COMMAND >> stripe listen --forward-to localhost:3000/api/webhook

// u'll get this  Ready! You are using Stripe API Version [2022-08-01]. Your webhook signing secret is whsec_c664c2ecc12b6422a08b352b103f1832e1e7a0816b09336f3adfa0771d523dce 
// then goto checkout page do the payment process, once u click 'payment button', then ur command prompt should say 'SUCCESS: Order cs_test_b1YKrmGwUPFsj9573oxLDj62kblpY4hwIFv59mNf8ls3mJvnNvQscNjENK had been added to database'
// then all your items payment data should store in firebase FIRESTORE. 4:47:00


// Once u get all this CORRECT, create 'success' page in pages folder