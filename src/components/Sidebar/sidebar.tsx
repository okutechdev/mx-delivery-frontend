import { NextPage } from 'next'
import Link from 'next/link'
import styles from './styles.module.scss';
import { FiHome, FiInbox, FiPackage, FiSettings, FiUser } from 'react-icons/fi'

const SideBar: NextPage = ()=>{
    return (
    <div className={styles.sidebar}>
       <nav>
            <Link href={'/'}>
                    <a>MX Delivery</a>
            </Link>
            <Link href={'/'}>
                <a>
                    <i><FiHome size={24}/></i>
                    Dashboard
                </a>
            </Link>
            <Link href={'/orders'}>
                <a>
                    <i><FiInbox size={24}/></i>
                    Pedidos
                </a>
            </Link>
            <Link href={'/custumers'}>
                <a>
                    <i><FiUser size={24}/></i>
                    Clientes
                </a>
            </Link>
            <Link href={'/products'}>
                <a>
                    <i><FiPackage size={24}/></i>
                    Produtos
                </a>
            </Link>
       </nav>
        
        <h3>POWERED BY OKUTECH</h3>

      </div>
    )
}

export default SideBar;