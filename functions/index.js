const functions = require('firebase-functions');
const express=require('express');
const cors=require('cors');
const { response } = require('express');
const stripe=require('stripe')('sk_test_51HURjVJT8OH1k5TWhmzrHvYUasI22fnuZxuhsTNOvROHO9BpBnXN4ByJvQl77fsLgEjeTOacU5ykYSjuvVRpBZiM00460yOJIw')


// API
// App config
const app=express();

//middleware
app.use(cors({origin:true}));
app.use(express.json());

//API route
app.get('/',(request,response)=>
response.status(200).send('hello world'));//print in console on webAPI
app.post('/payments/create',async (request,response)=>
{
    const total=request.query.total;
    console.log('payment Request recive',total);
    const paymentIntent =await stripe.paymentIntent.create(
        {
            amount:total,
            currency:"usd",
            
        }
    );
    response.status(201).send({
        clientSecret:paymentIntent.client_secret,
    })
})

//Listen command
exports.api=functions.https.onRequest(app)


//endpoint
//http://localhost:5001/fir-5871d/us-central1/api


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
