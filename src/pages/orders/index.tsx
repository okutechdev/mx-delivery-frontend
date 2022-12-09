import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import OrderCard from '../../components/OrderCard';
import PageHeader from '../../components/PageHeader';
import { api } from '../../services/api';

type OrderResponseType = {
    code: string,
    delivery_tax: number
    district: {
        id: string
        description: string
    }
    delivery_date: Date,
    status: string,
    custumer: {
        firstname: string,
        lastname: string,
    }
}

type OrderProps = {
    code: string,
    delivery_tax: number
    delivery_address: string
    delivery_date: string,
    custumer: string
    status: string
}

type OrdersProps = {
    orders: OrderProps[]
}

const Orders = ({ orders }: OrdersProps) => {
    const router = useRouter();

    const handleOnClick = (code: string) => {
        router.push(`/orders/${code}`)
    }

    return (
        <>
            <PageHeader title={`Pedidos: ${orders.length} `}
                handle={() => router.push('/orders/register')}
                buttonTitle='Registrar Novo Pedido' />
            {orders.length > 0 && orders.map(order => (
                <OrderCard key={order.code}
                    status={order.status}
                    handle={() => handleOnClick(order.code)}
                    name={order.custumer}
                    location={order.delivery_address}
                    orderTime={order.delivery_date}
                    reference={`#${order.code}`} />
            ))}
        </>
    )
}

Orders.layout = Layout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const token = ctx.req.cookies['%40mxtoken'];
    api.defaults.headers.common.Authorization = `Bearer ${token}`

    const { data } = await api.get<OrderResponseType[]>('/orders');

    const serializedOrder = data.map(order => {
        return {
            code: order.code,
            delivery_address: order.district?.description || '',
            delivery_date: new Date(order.delivery_date).toLocaleString(),
            custumer: `${order.custumer.firstname} ${order.custumer.lastname}`,
            status: order.status
        }
    })

    return {
        props: {
            orders: serializedOrder
        }
    }
}


export default Orders;