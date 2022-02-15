import { NextPage } from 'next'
import Link from 'next/link'
import styles from './styles.module.scss';

const SideBar: NextPage = ()=>{
    return (
    <div className={styles.sidebar}>
       <Link href={'/'}>
            <a>MX Delivery</a>
       </Link>
        <Link href={'/orders'}>
            <a>Pedidos</a>
        </Link>
        <Link href={'/products'}>
            <a>Produtos</a>
        </Link>
        <Link href={'/custumers'}>
            <a>Clientes</a>
        </Link>
      </div>
    )
}

export default SideBar;