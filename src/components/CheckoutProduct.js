import { StarIcon } from '@heroicons/react/outline'
import { session } from 'next-auth/client'
import Image from 'next/image'
import React from 'react'
import Currency from "react-currency-formatter"
import { useDispatch } from 'react-redux'
import { addToBasket, removeFromBasket } from '../slices/basketSlice'

const CheckOutProduct = ({ i, id, title, price, rating, description, category, image, hasPrime }) => {
    const dispatch = useDispatch();
    const addItemtoBasket = () => {
        const product = {
            id, title, price, rating, description, category, image, hasPrime
        };
        // push item into redux store
        dispatch(addToBasket(product));
    }
    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({ id }))
    }

    return (
        <div className="grid grid-cols-5">
            <Image src={image} height={200} width={200} objectFit="contain" />

            {/* Middle */}
            <div className="col-span-3 mx-5">
                <p>{title}</p>
                <div className="flex">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <StarIcon className="h-5 text-yellow-500" />
                        ))}
                </div>
                <p className="text-xs my-2 line-clamp-3">{description}</p>
                <Currency quantity={price} currency="USD" />
                {hasPrime && (
                    <div className=" flex items-center space-x-2">
                        <img loading="lazy" className="w-12" src="https://links.papareact.com/fdw" alt="" />
                        <p className="text-xs text-gray-500">Free Next-Day Delivery</p>
                    </div>
                )}

            </div>
            <div>
                {/* Right: Add & Remove Buttons */}
                <button onClick={addItemtoBasket} className="button flex flex-col space-y-2 my-auto justify-self-end ">Add to Basket</button>
                <br />
                <button onClick={removeItemFromBasket} className="button flex flex-col space-y-2 my-auto justify-self-end ">Remove From Cart</button>
            </div>
            
        </div>
    )
}

export default CheckOutProduct
