import styles from './styles.module.scss'

type OrderItem = {
    product_description: string,
    qts: number
    subtotal: number
    product_id: number
}

type OrderItemCardProps = {
    orderItem: OrderItem
}
const OrderItemCard = ({orderItem}: OrderItemCardProps)=>{
    return (
            <div className={styles.orderItem} key={orderItem.product_id}>
                <div className={styles.description}>
                    <h3>{orderItem.product_description}</h3>
                    <span>{orderItem.qts}x unidades</span>
                </div>
                <h3>{orderItem.subtotal} KZ</h3>
            </div>
        )
}

export default OrderItemCard;