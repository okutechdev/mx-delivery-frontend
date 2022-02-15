import styles from './styles.module.scss'
import { FiTrash } from 'react-icons/fi'

type OrderItem = {
    product_description: string,
    qts: number
    subtotal: number
    product_id: number
}

type OrderItemCardProps = {
    orderItem: OrderItem
    handleRemove?: ()=> void
}

const OrderItemCard = ({orderItem, handleRemove}: OrderItemCardProps)=>{
    return (
            <div className={styles.orderItem} key={orderItem.product_id}>
                <div className={styles.description}>
                    <h3>{orderItem.product_description}</h3>
                    <span>{orderItem.qts}x unidades</span>
                </div>
                <h3>{orderItem.subtotal} KZ</h3>
                {handleRemove && <FiTrash onClick={handleRemove} size={24}/>}
            </div>
        )
}

export default OrderItemCard;