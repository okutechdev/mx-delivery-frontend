import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import Layout from "../../../components/Layout";
import { api } from "../../../services/api";
import styles from './styles.module.scss'

type ProductProps = {
    description: string
    buy_price: number
    price: number
}

const Register = ()=>{

    const router = useRouter();
    const { register, handleSubmit } = useForm<ProductProps>();

    const onSubmit : SubmitHandler<ProductProps> = async (values)=>{
        await api.post('/products',{ ...values});
        router.push('/products')
    }

    return (
        <>
        <h2>Registrar Novo Produto</h2>
        <div className={styles.form}>    
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="description">Descricao</label>
                <input {...register('description')} />

                <label htmlFor="buy_price">Preco de Compra</label>
                <input {...register('buy_price')} />

                <label htmlFor="price">Preco de Venda</label>
                <input {...register('price')} />

                <button type="submit">Registrar</button>
                
                <Link href={'/products'}>
                        <a>Cancelar</a>
                </Link>
            </form>
        </div>
        </>
    )
}

Register.layout = Layout;

export default Register;