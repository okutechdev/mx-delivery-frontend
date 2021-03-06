import { NextPage } from "next";
import { createContext, useEffect, useState } from "react";

type Product={
    id: number
    description: string
    price: number
}

type OrderItem = {
    product_id: number,
    product_description: string
    qts: number,
    price: number,
    subtotal: number
}
type CartContextProps = {
    order_items: OrderItem[]
    subtotal: number
    addItem: (product: Product)=> void
    removeItem: (product_id: number)=> void
    cleanCart: ()=> void
}

export const CartContext = createContext({} as CartContextProps)

export const CartProvider: NextPage = ({children})=>{

    const [order_items, setOrderItems] = useState<OrderItem[]>([]);
    const [subtotal, setSubtotal] = useState(0);

    useEffect(()=>{
        if(order_items.length >= 0){
            let counter = 0;
            for(const order of order_items){
                counter += order.subtotal
            }
            setSubtotal(counter)
        }
    }, [order_items])

    const addItem = (product: Product)=>{
        const existItem = order_items.find(item=> item.product_id == product.id);

        if(existItem){
            existItem.qts = existItem.qts + 1;
            
            existItem.subtotal = (existItem.price * existItem.qts);
            const orderFilter = order_items.filter(item=> item.product_id != existItem.product_id);
            return setOrderItems([...orderFilter, { ...existItem }])
        }

        setOrderItems([
            ...order_items,{
            price: product.price,
            product_description: product.description,
            product_id: product.id,
            qts: 1,
            subtotal: product.price
        }])
    }

    const removeItem = (product_id: number)=>{
        const existItem = order_items.find(item=> item.product_id == product_id);

        if(existItem){
            const orderFilter = order_items.filter(item=> item.product_id != existItem.product_id);
            setOrderItems([...orderFilter])
        }
    }

    const cleanCart = ()=> {
        setOrderItems([]);
    }

    return(
        <CartContext.Provider value={{ order_items, subtotal, addItem, cleanCart, removeItem }}>
            {children}
        </CartContext.Provider>
    )
}