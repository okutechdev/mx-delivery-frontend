import { LayoutProps } from '../../@types/pageWithLayout'
import useAuth from '../../contexts/useAuth'
import SideBar from '../Sidebar/sidebar'
import styles from './styles.module.scss'
import { FiLogOut} from 'react-icons/fi'

const Layout : LayoutProps = ({children })=>{
    const { logout, user } = useAuth();

    const handle = ()=> logout();

    return(
        <>
        <SideBar/>
        <div className={styles.main}>
            <nav>
            <a href="#">{user?.username}</a>
            <FiLogOut size={24} onClick={handle} style={{ cursor: 'pointer'}}/>
            </nav>
            {children}
        </div>
        </>
    )
}

export default Layout;