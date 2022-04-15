import styles from './styles.module.scss'
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'

import PageHeader from '../../../components/PageHeader';
import Layout from '../../../components/Layout';

import { api } from '../../../services/api';
import useCart from '../../../contexts/useCart';
import OrderItemCard from '../../../components/OrderItemCard';

type Product={
    id: number
    description: string
    price: number
}

type RegisterProps = {
    products: Product[]
}


const Register = ({ products }: RegisterProps)=>{

    const { order_items, subtotal, cleanCart, addItem, removeItem } = useCart()

    const router = useRouter();
    const [searchQuery, setSeachQuery] = useState('')
    const [searchResults, setSearchResults] = useState<Product[]>(products)

    useEffect(()=>{
        const filterResults = products.filter(product=> product.description.toLowerCase().includes(searchQuery.toLowerCase()))
        setSearchResults(filterResults)
    },[searchQuery, products])


    const handleSearch = ({target: {value}}: BaseSyntheticEvent)=>{
        setSeachQuery(value);
    }

    const handleAddItem = (product: Product)=>{
        addItem(product);
    }

    const handleRemoveItem = (product_id : number)=>{
        removeItem(product_id)
    }

    const handleClean = ()=>{
        cleanCart()
        setSeachQuery('')
    }

    const handleRegister = ()=>{
        if(order_items.length > 0){
            router.push('/orders/checkout')
        }
    }

    return (
        <>
            <PageHeader title='Registrar Novo Pedido'/>
                <div className={styles.container}>
                    <div className={styles.products}>
                        <div className={styles.searchbar}>
                            <h2>Pesquisar</h2>
                            <input name='search' type="text"
                                value={searchQuery}
                                onChange={handleSearch} />
                        </div>
                        <div className={styles.productList}>
                                {searchResults.length > 0 && searchResults.map(product=>(
                                        <div  key={product.id} onClick={()=>handleAddItem(product)}
                                            className={styles.product_item}>
                                            <p>{product.description}</p>
                                            <p>{product.price} KZ</p>
                                        </div>
                                ))}
                        </div>
                    </div>
                <div className={styles.summary}>
                    <div className={styles.items}>
                        {order_items.length > 0 && order_items.map(orderItem=>(
                            <OrderItemCard key={orderItem.product_id} 
                                           handleRemove={()=> handleRemoveItem(orderItem.product_id)}
                                           orderItem={orderItem}/>
                        ))}
                    </div>
                    <div className={styles.itemsSummary}>
                        <span>Subtotal: {subtotal} KZ</span>
                        <button type='button' onClick={handleRegister}>Registrar</button>
                        <button type='button' 
                                onClick={handleClean}
                                className={styles.abort}>
                                Limpar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

Register.layout = Layout;

export const getServerSideProps: GetServerSideProps = async(ctx)=>{

    const token = ctx.req.cookies['%40mxtoken'];
    api.defaults.headers.common.Authorization = `Bearer ${token}`

    const { data: products} = await api.get<Product[]>('/products');

    return {
        props: {
            products
        }
    }
}


export default Register;
