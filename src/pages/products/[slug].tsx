import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './styles.module.scss'
import Layout from '../../components/Layout';
import { GetServerSideProps } from 'next';
import { api } from '../../services/api';
import { useState } from 'react';
import { useRouter } from 'next/router';

type ProductProps = {
    id: number
    description: string
    buy_price: number
    price: number
}

type EditProps = {
    product: ProductProps
}

const Edit = ({ product }: EditProps)=> {

    const router = useRouter();
    const { handleSubmit, register } = useForm<ProductProps>();

    const onSubmit : SubmitHandler<ProductProps> = async({description, buy_price, price})=>{
        const { status } = await api.put<ProductProps>(`/products/${product.id}`,{
            description, buy_price, price
        });
        if(status === 200) router.push('/products');
    }

    return (
        <>
        <h2>Detalhe do Produto</h2>
        <div className={styles.form}>    
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="description">Descricao</label>
                <input {...register('description',{
                    value: product.description
                })} />

                <label htmlFor="buy_price">Preco de Compra</label>
                <input {...register('buy_price',{
                    value: product.buy_price
                })} />

                <label htmlFor="price">Preco de Venda</label>
                <input {...register('price',{
                    value: product.price
                })} />

                <button type="submit">Actualizar</button>
                
                <Link href={'/products'}>
                        <a>Cancelar</a>
                </Link>
            </form>
        </div>
        </>
    )
}

Edit.layout = Layout

export const getServerSideProps : GetServerSideProps = async(ctx)=>{
    const { slug } = ctx.query

    if(!slug) return {
        notFound: true
    }

    const token = ctx.req.cookies['%40mxtoken'];
    api.defaults.headers.Authorization = `Bearer ${token}`

    const { data } = await api.get<ProductProps>(`/products/${slug}`);

    return{
        props: {
            product: data
        }
    }
}

export default Edit;