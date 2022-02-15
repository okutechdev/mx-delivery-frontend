import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import Layout from "../../../components/Layout";
import { api } from "../../../services/api";
import styles from './styles.module.scss'

type CustumerProps = {
    firstname: string
    lastname: string
    phone_number: string
    alt_phone_number?: string
    address: string
}

const Register = ()=>{

    const router = useRouter();
    const {register, handleSubmit } = useForm<CustumerProps>();

    const onSubmit : SubmitHandler<CustumerProps> = async (values)=>{
        await api.post('/custumers',{ ...values});
        router.push('/custumers')
    }

    return (
        <>
        <h2>Registrar Novo Cliente</h2>
        <div className={styles.form}>    
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="firstname">Nome</label>
                <input {...register('firstname')} />

                <label htmlFor="lastname">Sobrenome</label>
                <input {...register('lastname')} />

                <label htmlFor="phone_number">Telefone</label>
                <input {...register('phone_number')} />

                <label htmlFor="alt_phone_number">Telefone Alternativo</label>
                <input {...register('alt_phone_number')} />

                <label htmlFor="address">Endereco</label>
                <input {...register('address')} />

                <button type="submit">Registrar</button>
                
                <Link href={'/custumers'}>
                        <a>Cancelar</a>
                </Link>
            </form>
        </div>
        </>
    )
}

Register.layout = Layout;



export default Register;