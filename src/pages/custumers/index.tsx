import type { GetServerSideProps, NextPage } from 'next'
import  { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import PageHeader from '../../components/PageHeader';
import { api } from '../../services/api';
import styles from './styles.module.scss'

type Custumer = {
    id?: number
    firstname: string
    lastname: string
    phone_number: string
    alt_phone_number?:string
    address: string
}

type CustumerProps = {
    custumers: Custumer[]
}


const Custumers = ({custumers}:CustumerProps)=>{
    const router = useRouter()

    const handleRegisterCustumer = ()=>{
        router.push('/custumers/register')
    }
    
    return (
        <>
        <PageHeader title={`Clientes: ${custumers.length}`} 
                    handle={handleRegisterCustumer}
                    buttonTitle='Registrar Novo Cliente'/>
        {custumers.length > 0 && custumers.map(custumer=>(
            <div className={styles.card} key={custumer.id}>
                <div className={styles.description}>
                    <h3>{custumer.firstname} {custumer.lastname}</h3>
                    <span>{custumer.address}</span>
                </div>
                <h3>{custumer.phone_number}</h3>
            </div>
        ))}
        </>
    )
}

export const getServerSideProps : GetServerSideProps = async(ctx)=>{
    
    const token = ctx.req.cookies['%40mxtoken'];
    api.defaults.headers.Authorization = `Bearer ${token}`

    const { data } = await api.get<Custumer[]>('/custumers');

    return {
        props: {
            custumers : data
        }
    }

}

Custumers.layout = Layout;

export default Custumers;