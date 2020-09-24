// import { Link } from '@material-ui/core';
// import { ShoppingBasket } from '@material-ui/icons'
// import {CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

// import React,{useEffect, useState} from 'react'
// import CurrencyFormat from 'react-currency-format';
// import CheckoutProduct from './CheckoutProduct'
// import './Payment.css'
// import { getBasketTotal } from './reducer';
// import { useStateValue } from './StateProvider';
// import axios from './axios'
// import { useHistory } from 'react-router-dom';
// import {db} from './firebase'
// import Orders from './Orders';

// function Payment() {
//     const [{basket,user},dispatch]=useStateValue();
//     const stripe=useStripe();
//     const elements=useElements();
//     const [error,setError]=useState(null);
//     const [disabled,setDisable]=useState(true);

//     const [succeeded,setSucceeded]=useState(false)
//     const [processing,setProcessing]=useState("")
//     const [clientSecret,setClientSecret]=useState(true)
//     const history=useHistory();

//     useEffect(()=>{
//         //genertae a special strip which allow us to change a customer secret key
//         const getClientSecret= async()=>{
//             const response=await axios(
//                 {
//                     //stripe expects the total in a currency subunits
//                     method:'post',
//                     url:`/payments/create?total=${getBasketTotal(basket) *100}`
//                 }
//             );
//             setClientSecret(response.data.clientSecret)

//         }
//         getClientSecret();

//     },
//     [basket]);
//     console.log('the client secre is>>>>',clientSecret);

// const handleSubmit= async (event)=>{
//     //stripe code
//     event.preventDefault();
//     setProcessing(true);
//     //client secret is basically how strip knows how much we are charging to customer

//     const payload=await stripe.confirmCardPayment(clientSecret,{
//         payment_method:{
//             card:elements.getElement(CardElement)
//         }
//     }).then(({paymentIntent}) =>
//     {
//         //paymentIntent =payment confirmation
//         //push into database
//         db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
//             basket:basket,
//             amount:paymentIntent.amount,
//             created:paymentIntent.created
//         })
//         setSucceeded(true);
//         setError(null);
//         setProcessing(false);
//         dispatch({
//             type:'Empty_Basket'
//         })
//         history.replace('/orders')
//     });
    

// }

// const handleChange=(event)=>
// {
//     //listen for change in the cardElemnt
//     //and display any error as the customer types their card details    
// setDisable(event.empty);
// setError(event.error ? event.error.message:"")
// }
//     return (
//         <div className="payment">
            
//             <div className='payment_container'>
//                 <h1>
//                     Checkout(
//                         <Link to="/checkout">
//                             {basket?.length} item

//                         </Link>
//                     )
//                 </h1>
//                 <div className='payment_section'>
//                     <div className='payment_title'>
//                         <h3>Delivery address</h3>
//                     </div>
//                     <div className='payment_address'>
//                         <p>{user?.email}</p>
//                         <p>React Lane</p>
//                         <p>los Angeles,CA</p>
//                     </div>
//                 </div>


//                 <div className='payment_section'>
//                     <div className='payment_title'>
//                         <h3>Review item and delivery</h3>
//                     </div>
//                     <div className='payment_item'>
//                     {basket.map(item=>(
//                     <CheckoutProduct
//                     id={item.id}
//                     image={item.image}
//                     title={item.title}
                    
//                     price={item.price}
//                     />))}
                     

//                     </div>
//                 </div>


//                 <div className='payment_section'>
//                     <div className='payment_title'>
//                         <h3>Payment Method</h3>
//                     </div>
//                     <div className="payment_details">
//                         {/*  stripe payment method */}
//                         <form onSubmit={handleSubmit}>
//                             <CardElement onChange={handleChange} />
//                             <div className='paymet_pricecontainer'>
                                
//                             <CurrencyFormat
//                             renderText= {(value)=> (
//                                 <h3>Order total:{value}</h3>
//                             )}
//                                    decimalScale={2}
//                                     value={getBasketTotal(basket)}
//                                    displayType={"text"}
//                                   thousandSeparator={true}
//                                     prefix={"$"}
//                             />
//                             <button disabled={processing || disabled || succeeded}> 
//                             <span> {processing ? <p>Processing</p> :"Buy now"}</span>
//                             </button>

//                             </div>
//                             {/*fail safe error */}
//                         {error && <div>{error}</div>}
//                         </form>

//                     </div>
//                 </div>

//             </div>
            
//         </div>
//     )
// }

// export default Payment


import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from './axios';
import { db } from "./firebase";

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    console.log('THE SECRET IS >>>', clientSecret)
    console.log('👱', user)

    const handleSubmit = async (event) => {
        // do all the fancy stripe stuff...
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation

            db
              .collection('users')
              .doc(user?.uid)
              .collection('orders')
              .doc(paymentIntent.id)
              .set({
                  basket: basket,
                  amount: paymentIntent.amount,
                  created: paymentIntent.created
              })

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders')
        })

    }

    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (
                        <Link to="/checkout">{basket?.length} items</Link>
                        )
                </h1>


                {/* Payment section - delivery address */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>

                {/* Payment section - Review Items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
            

                {/* Payment section - Payment method */}
                <div className='payment__section'>
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                            {/* Stripe magic will go */}

                            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange}/>

                                <div className='payment__priceContainer'>
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    />
                                    <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                    </button>
                                </div>

                                  {/* Errors */}
                                {error && <div>{error}</div>}
                            </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
