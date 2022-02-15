import { NextPage } from "next";
import { createContext, useState } from "react";

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
    cleanCart: ()=> void
}

export const CartContext = createContext({} as CartContextProps)

export const CartProvider: NextPage = ({children})=>{

    const [order_items, setOrderItems] = useState<OrderItem[]>([]);
    const subtotal = 0;

    const addItem = (product: Product)=>{
        const existItem = order_items.find(item=> item.product_id == product.id);

        if(existItem){
            existItem.qts = existItem.qts + 1;
            existItem.subtotal = existItem.subtotal * existItem.qts;
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

    const cleanCart = ()=> {
        setOrderItems([]);
    }

    return(
        <CartContext.Provider value={{ order_items, subtotal, addItem, cleanCart }}>
            {children}
        </CartContext.Provider>
    )
}