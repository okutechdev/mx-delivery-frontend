import { useContext } from "react";
import { CartContext } from "./cart";

export default function useCart(){
    return useContext(CartContext);
}