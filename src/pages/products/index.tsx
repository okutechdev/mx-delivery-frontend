import styles from './styles.module.scss'
import type { GetServerSideProps } from 'next'
import  { useRouter } from 'next/router';

import Layout from '../../components/Layout';
import PageHeader from '../../components/PageHeader';
import { api } from '../../services/api';

type Product = {
    id?: number
    description: string
    buy_price: number
    price: number
}

type ProductProps = {
    products: Product[]
}

const Products = ({products} : ProductProps)=>{
    const router = useRouter()

    const handleRegister = ()=>{
        router.push('/products/register')
    }
    
    return (
        <>
        <PageHeader title='Produtos' handle={handleRegister}
                    buttonTitle='Registrar Novo Produto'/>
        {products.length > 0 && products.map(product=>(
            <div className={styles.card} key={product.id}>
                <div className={styles.description}>
                    <h3>{product.description}</h3>
                </div>
                <h3>{product.price}</h3>
            </div>
        ))}
        </>
    )
}

export const getServerSideProps : GetServerSideProps = async(ctx)=>{
    
    const token = ctx.req.cookies['%40mxtoken'];
    api.defaults.headers.Authorization = `Bearer ${token}`

    const { data } = await api.get<Product[]>('/products');

    return {
        props: {
            products : data
        }
    }

}

Products.layout = Layout;


export default Products;