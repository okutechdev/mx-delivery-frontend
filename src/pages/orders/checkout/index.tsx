import styles from './styles.module.scss';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';

import Layout from '../../../components/Layout';
import { api } from '../../../services/api';
import useCart from '../../../contexts/useCart';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../../../contexts/useAuth';

type Custumer = {
    id: number
    firstname: string,
    lastname: string,
    address: string
}

type OrderInput = {
    custumer_id: number,
    address: string
    delivery_date: Date,
    delivery_tax: number,
}

type ChechoutProps = {
    custumers: Custumer[]
}

const Chechout  = ({ custumers }: ChechoutProps) => {

    const router = useRouter();
    const { user } = useAuth();
    const { order_items, cleanCart, subtotal } = useCart();
    const { handleSubmit, register } = useForm<OrderInput>();

    useEffect(()=>{
        if(order_items.length == 0){
            router.back();
        }
    })

    const onSubmit : SubmitHandler<OrderInput> = async (values)=>{

        const serializeOrder = {
            custumer_id : values.custumer_id,
            delivery_address: values.address,
            delivery_date: new Date(),
            user_id : user?.id,
            subtotal: subtotal + Number(values.delivery_tax),
            order_items: order_items.map(item=>{
                return {
                    product_id : item.product_id,
                    qts: item.qts,
                    price: item.price
                }
            })
        }

        const { status } = await api.post('/orders',{
            ...serializeOrder
        });

        if(status == 200){
            cleanCart();
            router.push('/orders');
        }

    }

    return (
        <>
            <h2>Finalizar Pedido</h2>
            <div className={styles.form}>    
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="custumer_id">Cliente</label>
                    <select {...register('custumer_id')} >
                        {custumers.length > 0 && custumers.map(custumer=>(
                            <option key={custumer.id} value={custumer.id}>
                                {custumer.firstname} {custumer.lastname}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="address">Endereço</label>
                    <input {...register('address')} />

                    <label htmlFor="delivery_tax">Taxa de Entrega</label>
                    <input type={'number'} {...register('delivery_tax') } />

                    <label htmlFor="delivery_date">Data do Pedido</label>
                    <input type={'datetime-local'} {...register('delivery_date', {
                        valueAsDate: true
                    })} />

                    <h2>Subtotal: {subtotal} KZ</h2>
                    <button type="submit">Registrar</button>
                    
                    <Link href={'/orders/register'}>
                            <a>Cancelar</a>
                    </Link>
                </form>
            </div>
        </>
    )
}

Chechout.layout = Layout;

export const getServerSideProps: GetServerSideProps = async (ctx)=>{
    const token = ctx.req.cookies['%40mxtoken'];
    api.defaults.headers.common.Authorization = `Bearer ${token}`

    const { data: custumers } = await api.get<Custumer[]>('/custumers')
    
    return {
        props: {
            custumers
        }
    }
}

export default Chechout
