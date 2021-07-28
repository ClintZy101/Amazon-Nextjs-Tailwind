import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectItems, selectTotal } from '../slices/basketSlice'
import Header from '../components/Header'
import CheckOutProduct from '../components/CheckOutProduct';
import { signIn, useSession } from 'next-auth/client';
import Currency from "react-currency-formatter"
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
const stripePromise = loadStripe(process.env.stripe_public_key)

const checkout = () => {
    const items = useSelector(selectItems);
    const total = useSelector(selectTotal);
    const [session] = useSession();
    
    const createCheckoutSession = async () => {
        const stripe = await stripePromise; 
        //  call backend to create a checkout session...
        const checkoutSession = await axios.post('/api/create-checkout-session',
        {
            items: items,
            email: session.user.email
        })
    } 

    return (
        <div>
            <Header />
            <main className="lg:flex max-w-screen-2xl mx-auto " >
                {/* Left */}
                <div className="flex-grow m-5 shadow-sm">
                    <Image src="https://links.papareact.com/ikj "
                        width={1020}
                        height={250}
                        objectFit="contain"
                    />
                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className="text-3xl border-b pb-4 ">
                            {items.length === 0 ? 'Shopping Cart is Empty' : 'Shopping Cart Items'}
                        </h1>
                    </div>
                    <div>
                        {items.map((item, i) => (
                            <CheckOutProduct
                                key={i}
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                rating={item.rating}
                                description={item.description}
                                category={item.category}
                                image={item.image}
                                hasPrime={item.hasPrime}
                            />
                        ))}
                    </div>
                </div>

                {/* Right */}
                <div className="flex flex-col bg-white p-10 shadow-md">
                    {items.length > 0 && (
                        <>
                            <h2 className="whitespace-nowrap">
                                SubTotal ({items.length} items): {" "}
                             <span className="font-bold">
                                    <Currency quantity={total} currency="USD" />
                            </span> 
                            </h2>
                            <button
                            role="link"
                             onClick={!session ?  signIn : createCheckoutSession} className={`button mt-2 ${!session && "from-gray-300 to-gray-500 border-gray-200 text-gray-300"}`}>
                                {!session ? "Sign In to Checkout" : "Proceed to Checkout"}
                            </button>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default checkout
