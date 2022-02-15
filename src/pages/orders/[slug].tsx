import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

import Layout from '../../components/Layout'
import OrderCard from '../../components/OrderCard'
import OrderItemCard from '../../components/OrderItemCard'

import { api } from '../../services/api'

type OrderItem = {
    id: number,
    product: {
        description: string
    }
    qts: number,
    price: number
}

type OrderProps = {
    id: number,
    code : string,
    delivery_date: string,
    subtotal: number,
    status: string,
    delivery_address: string,
    user: {
        username: string
    },
    custumer: {
        firstname: string,
        lastname: string,
        phone_number: string
    },
    order_items: OrderItem[]
}

type DetailProps = {
    order: OrderProps
}
const Detail = ({ order }: DetailProps)=> {

    const router = useRouter();

    const handleBack = ()=> router.back();
    const handleDeliveryDone = ()=>{
        
    }

    return (
        <>
            <h2>Detalhe do Pedido</h2>
            <OrderCard name={`${order.custumer.firstname} 
                              ${order.custumer.lastname}`}
                       reference={`#${order.code}`}
                       orderTime={new Date(order.delivery_date).toLocaleTimeString('pt')}
                       location={order.delivery_address}/>

            <div className={styles.container}>
                <div className={styles.summary}>
                    <h3>Telefone: {order.custumer.phone_number}</h3>
                    <span>Subtotal: {order.subtotal} KZ</span>
                </div>

                {order.order_items.length > 0 && order.order_items.map(orderItem=>(
                    <OrderItemCard key={orderItem.id} orderItem={{
                        product_description: orderItem.product.description,
                        product_id: orderItem.id,
                        qts: orderItem.qts,
                        subtotal: orderItem.price * orderItem.qts
                    }}/>
                ))}
               <div className={styles.buttons}>
                    <button>Marcar como Entregue</button>
                    <button onClick={handleBack}>Voltar</button>
               </div>
            </div>
        </>
    )
}

Detail.layout = Layout;

export const getServerSideProps: GetServerSideProps = async(ctx)=>{

    const { slug } = ctx.query

    const token = ctx.req.cookies['%40mxtoken'];
    api.defaults.headers.Authorization = `Bearer ${token}`

    const { data } = await api.get<OrderProps[]>(`/orders/${slug}`);
    
    return {
        props: {
            order : data[0]
        }
    }
}


export default Detail