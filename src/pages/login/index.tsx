import { SubmitHandler, useForm } from "react-hook-form";
import EmptyLayout from "../../components/EmptyLayout";
import useAuth from "../../contexts/useAuth";
import styles from './styles.module.scss'

type LoginProps = {
    username: string,
    password: string
}

const Login  = ()=>{

    const { signIn } = useAuth();
    const { handleSubmit, register} = useForm<LoginProps>();

    const handle: SubmitHandler<LoginProps> = async({username, password})=>{
        signIn({username, password});
    }

    return (
        <div className={styles.container}>
            <h2>MX Delivery</h2>
            <form onSubmit={handleSubmit(handle)}>
                <label htmlFor="username">Username</label>
                <input {...register('username')} />
                <label htmlFor="password">Password</label>
                <input {...register('password')} />
                <button type="submit">Conectar</button>
            </form>
        </div>
    )
}

Login.layout = EmptyLayout;

export default Login