import type { NextPage } from 'next'
import styles from './styles.module.scss'

type OrderItemCardType = {
    name: string,
    location: string,
    orderTime: string,
    reference: string,
    handle: ()=> void
}

const OrderCard : NextPage<OrderItemCardType> = ({name, location, orderTime, reference, handle})=>{
    return(
        <div onClick={handle} className={styles.card}>
            <div className={styles.description}>
                <h3>{name}</h3>
                <span>{location}</span>
            </div>
            <h3>Hora da Entrega: {orderTime}</h3>
            <div className={styles.order_number}>
                <span>{reference}</span>
            </div>
        </div>
    )
}

export default OrderCard;